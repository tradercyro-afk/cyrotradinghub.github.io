param(
  [int]$Port = 5500
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$url = "http://localhost:$Port/"
Write-Host "Starting local preview at $url" -ForegroundColor Cyan

function Test-PythonCommand {
  param([string]$CommandName)

  try {
    $null = & $CommandName --version 2>$null
    return $LASTEXITCODE -eq 0
  }
  catch {
    return $false
  }
}

if (Test-PythonCommand -CommandName "python") {
  Start-Process $url | Out-Null
  python -m http.server $Port
  exit 0
}

if (Test-PythonCommand -CommandName "py") {
  Start-Process $url | Out-Null
  py -m http.server $Port
  exit 0
}

Write-Host "Python not found. Using built-in PowerShell static server instead." -ForegroundColor Yellow

function Get-ContentType {
  param([string]$Path)

  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8"; break }
    ".css" { "text/css; charset=utf-8"; break }
    ".js" { "application/javascript; charset=utf-8"; break }
    ".json" { "application/json; charset=utf-8"; break }
    ".png" { "image/png"; break }
    ".jpg" { "image/jpeg"; break }
    ".jpeg" { "image/jpeg"; break }
    ".gif" { "image/gif"; break }
    ".svg" { "image/svg+xml"; break }
    ".ico" { "image/x-icon"; break }
    ".webp" { "image/webp"; break }
    ".txt" { "text/plain; charset=utf-8"; break }
    default { "application/octet-stream" }
  }
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Start-Process $url | Out-Null
Write-Host "Serving $root at $url" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop." -ForegroundColor DarkGray

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestPath = $context.Request.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($requestPath)) {
      $requestPath = "index.html"
    }

    $safePath = [System.Uri]::UnescapeDataString($requestPath) -replace '/', '\\'
    $filePath = Join-Path $root $safePath

    if ((Test-Path $filePath -PathType Container)) {
      $filePath = Join-Path $filePath "index.html"
    }

    if (Test-Path $filePath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $context.Response.StatusCode = 200
      $context.Response.ContentType = Get-ContentType -Path $filePath
      $context.Response.ContentLength64 = $bytes.Length
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    else {
      $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
      $context.Response.StatusCode = 404
      $context.Response.ContentType = "text/plain; charset=utf-8"
      $context.Response.ContentLength64 = $notFound.Length
      $context.Response.OutputStream.Write($notFound, 0, $notFound.Length)
    }

    $context.Response.OutputStream.Close()
  }
}
finally {
  if ($listener.IsListening) {
    $listener.Stop()
  }
  $listener.Close()
}
