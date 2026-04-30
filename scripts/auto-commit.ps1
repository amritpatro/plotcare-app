param(
  [string]$Message = "Auto-commit meaningful PlotCare changes",
  [string]$Remote = "origin",
  [string]$Branch = "",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Invoke-Git {
  param([string[]]$Arguments)

  & git @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "git $($Arguments -join ' ') failed."
  }
}

function Test-MeaningfulPath {
  param([string]$Path)

  $normalized = $Path -replace "\\", "/"

  if ($normalized -match "(^|/)(node_modules|\.next|out|build|coverage)(/|$)") { return $false }
  if ($normalized -match "(^|/)(\.DS_Store|Thumbs\.db)$") { return $false }
  if ($normalized -match "\.log$") { return $false }
  if ($normalized -like ".codex-next-dev*") { return $false }
  if ($normalized -like ".vscode/*") { return $false }
  if ($normalized -like ".env*") { return $false }

  return $true
}

if (-not $Branch) {
  $Branch = (& git branch --show-current).Trim()
}

if (-not $Branch) {
  throw "Could not determine the current git branch."
}

Write-Host "Syncing $Branch with $Remote before committing..."
Invoke-Git @("fetch", $Remote, $Branch)
Invoke-Git @("-c", "rebase.autoStash=true", "pull", "--rebase", $Remote, $Branch)

$statusLines = & git status --porcelain=v1 --untracked-files=all
$paths = @()

foreach ($line in $statusLines) {
  if ([string]::IsNullOrWhiteSpace($line)) { continue }

  $path = $line.Substring(3)
  if ($path -match " -> ") {
    $path = ($path -split " -> ")[-1]
  }

  $path = $path.Trim('"')
  if (Test-MeaningfulPath $path) {
    $paths += $path
  }
}

$paths = $paths | Sort-Object -Unique

if ($paths.Count -eq 0) {
  Write-Host "No meaningful changes to commit."
  exit 0
}

Write-Host "Meaningful paths:"
$paths | ForEach-Object { Write-Host " - $_" }

if ($DryRun) {
  Write-Host "Dry run complete. Nothing was staged, committed, or pushed."
  exit 0
}

& git add -- $paths
if ($LASTEXITCODE -ne 0) {
  throw "git add failed."
}

$staged = & git diff --cached --name-only
if (-not $staged) {
  Write-Host "No staged changes after filtering."
  exit 0
}

Invoke-Git @("commit", "-m", $Message)
Invoke-Git @("push", $Remote, $Branch)
