# MedSecure Port Release Utility
# This script finds and kills any process running on the specified port.

$port = 5000

try {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        $pidToKill = $connection.OwningProcess
        Write-Host "Found process $pidToKill on port $port. Terminating..." -ForegroundColor Cyan
        Stop-Process -Id $pidToKill -Force
        Write-Host "Port $port has been successfully released!" -ForegroundColor Green
    } else {
        Write-Host "Port $port is already clear." -ForegroundColor Yellow
    }
} catch {
    Write-Host "No process found on port $port or insufficient permissions." -ForegroundColor Gray
}
