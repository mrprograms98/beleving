<?php

$to = "m.rashid@live.nl";
$subject = "Nieuwe intake aanmelding";

$message = "
Voornaam: ".$_POST['voornaam']."
Achternaam: ".$_POST['achternaam']."
Email: ".$_POST['email']."
Telefoon: ".$_POST['telefoon']."
Adres: ".$_POST['adres']."
Postcode: ".$_POST['postcode']."
Stad: ".$_POST['stad']."
Polisnummer: ".$_POST['polis']."

Reden:
".$_POST['reden'];

$headers = "From: ".$_POST['email'];

mail($to,$subject,$message,$headers);

echo "<h2>Bedankt! Uw aanmelding is verzonden.</h2>";

?>