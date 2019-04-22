Set-Location "public"
Add-Type -AssemblyName "System.Web";
$Hso=New-Object Net.HttpListener;
$Hso.Prefixes.Add("http://localhost:8000/");
$Hso.Start();
While ($Hso.IsListening){
  $HC=$Hso.GetContext();
  $HRes=$HC.Response;
  $HRes.Headers.Add("Content-Type", [System.Web.MimeMapping]::GetMimeMapping($HC.Request.RawUrl));
  $Stream=[System.IO.File]::OpenRead((Join-Path $Pwd ($HC.Request.RawUrl)));
  $HRes.ContentLength64=$Stream.Length;
  $Stream.CopyTo($HRes.OutputStream);
  $Stream.Close();
  $HRes.Close()
};
$Hso.Stop()
