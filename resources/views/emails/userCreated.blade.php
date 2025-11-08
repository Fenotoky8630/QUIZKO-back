<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue sur notre plateforme</title>
</head>
<body>
    <h1>Bonjour {{ $userName }},</h1>
    <p>Bienvenue dans notre application ! Votre compte a été créé avec succès.</p>
    <p>Voici vos identifiants de connexion initiaux :</p>
    <ul>
        <li>Email : {{ $userEmail }}</li>
        <li>Mot de passe : {{ $userPassword }}</li>
    </ul>
    <!-- <p>Veuillez vous assurer de changer votre mot de passe lors de votre première connexion pour des raisons de sécurité.</p> -->
    <p>Merci de nous avoir rejoints !</p>
</body>
</html>
