<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Zorg dat PHPMailer via Composer geïnstalleerd is

// Functie om input te saniteren
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

// HTML e-mail inhoud
$html = '...'; // Je bestaande HTML van hierboven (laat onveranderd)

// PHPMailer configuratie
$mail = new PHPMailer(true);

try {
    // Server instellingen
    $mail->isSMTP();
    $mail->Host       = 'mail.ggzbelevingswereld.nl'; // mailserver van jouw domein
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@ggzbelevingswereld.nl'; // jouw mailbox
    $mail->Password   = 'JE_MAILBOX_WACHTWOORD';      // wachtwoord van mailbox
    $mail->SMTPSecure = 'tls';                        // of 'ssl' afhankelijk van je server
    $mail->Port       = 587;                          // 587 voor TLS, 465 voor SSL

    // Ontvanger & afzender
    $mail->setFrom('info@ggzbelevingswereld.nl', 'Praktijk Belevingswereld');
    $mail->addAddress('info@ggzbelevingswereld.nl');  // alles komt in deze inbox
    $mail->addReplyTo($email, "$voornaam $achternaam"); // reageer naar invuller van formulier

    // Inhoud
    $mail->isHTML(true);
    $mail->Subject = "Nieuwe intake-aanmelding – $voornaam $achternaam";
    $mail->Body    = $html;

    $mail->send();
    $success = true;
} catch (Exception $e) {
    $success = false;
    $errorMsg = $mail->ErrorInfo;
}

// Resultaat tonen
?>
<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>Verzonden – praktijk belevingswereld</title>
<style>
/* Je bestaande CSS voor de bedankpagina */
</style>
</head>
<body>
<div class="card">
  <?php if ($success): ?>
    <p class="label">Aanmelding ontvangen</p>
    <h1>Bedankt, <?= $voornaam ?>.</h1>
    <p>Uw aanmelding is succesvol verzonden. Wij nemen zo spoedig mogelijk contact met u op om een kennismakingsgesprek in te plannen.</p>
  <?php else: ?>
    <p class="label">Fout bij verzenden</p>
    <h1>Sorry, <?= $voornaam ?>.</h1>
    <p>Er is iets misgegaan bij het verzenden van uw aanmelding. Probeer het later opnieuw.<br>Error: <?= $errorMsg ?></p>
  <?php endif; ?>
  <a href="index.html">Terug naar home</a>
</div>
</body>
</html>
