<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'config.php';

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Functie om input te saniteren
function clean($val) {
    return strip_tags(trim($_POST[$val] ?? ''));
}

$voornaam   = clean('voornaam');
$achternaam = clean('achternaam');
$email      = clean('email');
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Ongeldig e-mailadres");
}
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

$html = '
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f7f5f2; font-family: Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f2; padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:#8fa39a; padding:30px; text-align:center; color:white;">
    <h1 style="margin:0; font-weight:300; font-size:24px;">Nieuwe aanmelding</h1>
    <p style="margin:5px 0 0; font-size:13px; opacity:0.9;">Praktijk Belevingswereld</p>
</td>
</tr>

<!-- CONTENT -->
<tr>
<td style="padding:30px; color:#2e2e2e;">

<p style="margin-bottom:20px;">Er is een nieuwe intake-aanvraag binnengekomen:</p>

<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; font-size:14px;">

<tr>
<td style="border-bottom:1px solid #eee;"><strong>Naam</strong></td>
<td style="border-bottom:1px solid #eee;">'.$voornaam.' '.$achternaam.'</td>
</tr>

<tr>
<td style="border-bottom:1px solid #eee;"><strong>Email</strong></td>
<td style="border-bottom:1px solid #eee;">'.$email.'</td>
</tr>

<tr>
<td style="border-bottom:1px solid #eee;"><strong>Telefoon</strong></td>
<td style="border-bottom:1px solid #eee;">'.$telefoon.'</td>
</tr>

<tr>
<td style="border-bottom:1px solid #eee;"><strong>Adres</strong></td>
<td style="border-bottom:1px solid #eee;">'.$adres.' '.$adres2.', '.$postcode.' '.$stad.', '.$land.'</td>
</tr>

<tr>
<td style="border-bottom:1px solid #eee;"><strong>Zorgverzekering</strong></td>
<td style="border-bottom:1px solid #eee;">'.$verzekering.'</td>
</tr>

<tr>
<td style="border-bottom:1px solid #eee;"><strong>Polisnummer</strong></td>
<td style="border-bottom:1px solid #eee;">'.$polis.'</td>
</tr>

<tr>
<td style="border-bottom:1px solid #eee;"><strong>Verwijzing</strong></td>
<td style="border-bottom:1px solid #eee;">'.$verwijzing.'</td>
</tr>

</table>

<!-- REDEN BLOK -->
<div style="margin-top:25px;">
    <strong>Reden van aanmelding:</strong>
    <div style="margin-top:10px; padding:15px; background:#f2efeb; border-radius:6px; line-height:1.6;">
        '.$reden.'
    </div>
</div>

<p style="margin-top:25px; font-size:12px; color:#8a8783;">
Verzonden op '.$datum.'
</p>

</td>
</tr>

</tr>

<tr>
<td style="padding:20px; text-align:center;">
<a href="mailto:'.$email.'" style="display:inline-block; padding:12px 24px; background:#8fa39a; color:white; text-decoration:none; border-radius:4px;">
Reageer op deze aanvraag
</a>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="padding:20px; text-align:center; font-size:12px; color:#8a8783; background:#faf9f7;">
Praktijk Belevingswereld<br>
Rust • Aandacht • Vertrouwen
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
';

// PHPMailer configuratie
$mail = new PHPMailer(true);

try {
    // Server instellingen
    $mail->isSMTP();
    $mail->Host       = 'smtp.transip.email'; // mailserver van jouw domein
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@ggzbelevingswereld.nl'; // jouw mailbox
    $mail->Password   = SMTP_PASSWORD;      // wachtwoord van mailbox
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // of 'ssl' afhankelijk van je server
    $mail->Port       = 465;                          // 587 voor TLS, 465 voor SSL

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
<!-- ========== HERO / BEDANKPAGINA ========== -->
<section class="small-hero">

    <!-- floating circles -->
    <div class="hero-circle circle-a"></div>
    <div class="hero-circle circle-b"></div>
    <div class="hero-circle circle-c"></div>

    <?php if ($success): ?>
        <h1>Bedankt, <?= $voornaam ?>.</h1>
        <p>Uw aanmelding is succesvol ontvangen. We nemen binnenkort rustig contact met u op.</p>
    <?php else: ?>
        <h1>Er ging iets mis, <?= $voornaam ?>.</h1>
        <p>Het verzenden is niet gelukt. Probeer het later opnieuw.<br><?= $errorMsg ?></p>
    <?php endif; ?>

    <div class="hero-buttons">
        <a href="index.php" class="btn-hero-primary">Terug naar home</a>
        <a href="contact.php" class="btn-hero-secondary">Opnieuw proberen</a>
    </div>

</section>


<!-- ========== EXTRA RUSTGEVENDE SECTIE ========== -->
<section class="mid-quote reveal">
    <h1>“Elke stap die u zet richting hulp, is een stap richting rust.”</h1>
    <h2>Wij begeleiden u daar zorgvuldig in</h2>
</section>


<!-- ========== CTA ========== -->
<section class="contact-section">
    <div class="contact-container reveal">
        <h2>We nemen contact met u op</h2>
        <p>U hoeft niets meer te doen. Wij zorgen voor de volgende stap.</p>
        <a href="index.php" class="btn-primary">Terug naar de website</a>
    </div>
</section>

<script>

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
    const trigger = window.innerHeight * 0.85;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < trigger){
            el.classList.add("revealed");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

</script>

</body>
</html>
