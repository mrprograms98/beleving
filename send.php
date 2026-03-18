<?php

// Sanitize input
function clean($val) {
    return htmlspecialchars(strip_tags(trim($_POST[$val] ?? '')), ENT_QUOTES, 'UTF-8');
}

$voornaam   = clean('voornaam');
$achternaam = clean('achternaam');
$email      = clean('email');
$telefoon   = clean('telefoon');
$adres      = clean('adres');
$adres2     = clean('adres2');
$postcode   = clean('postcode');
$stad       = clean('stad');
$land       = clean('land');
$taal       = clean('taal');
$locatie    = clean('locatie');
$verzekering= clean('zorgverzekering');
$polis      = clean('polis');
$verwijzing = clean('verwijzing');
$reden      = nl2br(clean('reden'));
$datum      = date('d-m-Y H:i');

$to      = "m.rashid@live.nl";
$subject = "=?UTF-8?B?" . base64_encode("Nieuwe intake-aanmelding – $voornaam $achternaam") . "?=";

$html = '<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Intake Aanmelding</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f5;font-family:Georgia,serif;">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f5;padding:48px 20px;">
<tr><td align="center">

<!-- Card -->
<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-top:4px solid #6b8f7a;box-shadow:0 20px 60px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr>
    <td style="background:#edf2ee;padding:36px 48px;border-bottom:1px solid #dce6df;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <p style="margin:0 0 4px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#6b8f7a;">Praktijk</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:400;color:#2e2e2e;letter-spacing:0.5px;">belevingswereld</h1>
          </td>
          <td align="right" style="vertical-align:top;">
            <p style="margin:0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;letter-spacing:1px;text-transform:uppercase;">Intake ontvangen</p>
            <p style="margin:4px 0 0 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:12px;color:#2e2e2e;">' . $datum . '</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Title bar -->
  <tr>
    <td style="background:#6b8f7a;padding:20px 48px;">
      <h2 style="margin:0;font-family:Georgia,serif;font-size:18px;font-weight:400;color:#ffffff;letter-spacing:0.5px;">Nieuwe Intake Aanmelding</h2>
      <p style="margin:4px 0 0 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.75);">' . $voornaam . ' ' . $achternaam . '</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:40px 48px;">

      <!-- Section: Persoonsgegevens -->
      <p style="margin:0 0 6px 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#6b8f7a;">Persoonsgegevens</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #dce6df;margin-bottom:28px;">
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;width:38%;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Voornaam</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $voornaam . '</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Achternaam</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $achternaam . '</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">E-mail</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <a href="mailto:' . $email . '" style="font-family:Georgia,serif;font-size:14px;color:#6b8f7a;text-decoration:none;">' . $email . '</a>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Telefoon</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $telefoon . '</span>
          </td>
        </tr>
      </table>

      <!-- Section: Adresgegevens -->
      <p style="margin:0 0 6px 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#6b8f7a;">Adresgegevens</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #dce6df;margin-bottom:28px;">
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;width:38%;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Adres</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $adres . ($adres2 ? ', ' . $adres2 : '') . '</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Postcode &amp; Stad</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $postcode . ' ' . $stad . '</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Land</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $land . '</span>
          </td>
        </tr>
      </table>

      <!-- Section: Praktijkvoorkeuren -->
      <p style="margin:0 0 6px 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#6b8f7a;">Praktijkvoorkeuren</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #dce6df;margin-bottom:28px;">
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;width:38%;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Taalvoorkeur</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $taal . '</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Locatievoorkeur</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $locatie . '</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Verwijzing huisarts</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . ucfirst($verwijzing) . '</span>
          </td>
        </tr>
      </table>

      <!-- Section: Verzekering -->
      <p style="margin:0 0 6px 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#6b8f7a;">Verzekering</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #dce6df;margin-bottom:28px;">
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;width:38%;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Zorgverzekering</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $verzekering . '</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;text-transform:uppercase;letter-spacing:1px;">Polisnummer</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #f4f7f5;">
            <span style="font-family:Georgia,serif;font-size:14px;color:#2e2e2e;">' . $polis . '</span>
          </td>
        </tr>
      </table>

      <!-- Section: Reden aanmelding -->
      <p style="margin:0 0 6px 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#6b8f7a;">Reden van aanmelding</p>
      <div style="border-top:1px solid #dce6df;padding:20px 0 0 0;margin-bottom:36px;">
        <p style="margin:0;font-family:Georgia,serif;font-size:14px;color:#2e2e2e;line-height:1.8;font-style:italic;">' . $reden . '</p>
      </div>

      <!-- CTA -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <a href="mailto:' . $email . '" style="display:inline-block;padding:14px 36px;background:#6b8f7a;color:#ffffff;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;">Reageren op cliënt</a>
          </td>
        </tr>
      </table>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#edf2ee;padding:24px 48px;border-top:1px solid #dce6df;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <p style="margin:0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;">praktijk belevingswereld &nbsp;·&nbsp; Tarasconweg 2, 5627 GB Eindhoven</p>
            <p style="margin:4px 0 0 0;font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:11px;color:#8a8783;">Dit bericht is automatisch verzonden via het online intake formulier.</p>
          </td>
          <td align="right">
            <p style="margin:0;font-family:Georgia,serif;font-size:18px;color:#dce6df;letter-spacing:1px;">bw</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>
<!-- /Card -->

</td></tr>
</table>
<!-- /Wrapper -->

</body>
</html>';

// E-mail headers voor HTML mail
$boundary = md5(uniqid(time()));
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Praktijk belevingswereld <noreply@praktijkbelevingswereld.nl>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $html, $headers);

?>
<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verzonden – praktijk belevingswereld</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#f4f7f5;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;}
  .card{background:#fff;max-width:540px;width:90%;padding:64px 56px;border-top:4px solid #6b8f7a;box-shadow:0 20px 60px rgba(0,0,0,0.08);text-align:center;}
  .icon{width:56px;height:56px;background:#edf2ee;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;}
  .icon svg{width:24px;height:24px;fill:#6b8f7a;}
  .label{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#6b8f7a;margin-bottom:12px;}
  h1{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:400;color:#2e2e2e;margin-bottom:16px;line-height:1.3;}
  p{font-size:14px;color:#8a8783;line-height:1.8;margin-bottom:32px;}
  a{display:inline-block;padding:14px 36px;background:#6b8f7a;color:#fff;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;}
  a:hover{background:#5a7d6a;}
</style>
</head>
<body>
<div class="card">
  <div class="icon">
    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
  </div>
  <p class="label">Aanmelding ontvangen</p>
  <h1>Bedankt, <?= $voornaam ?>.</h1>
  <p>Uw aanmelding is succesvol verzonden. Wij nemen zo spoedig mogelijk contact met u op om een kennismakingsgesprek in te plannen.</p>
  <a href="index.html">Terug naar home</a>
</div>
</body>
</html>
