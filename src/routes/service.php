<?php
# service
$app->group('/service', function () use ($app) {

    $app->group('/gdrive', function () use ($app) {

        $app->get('/authorize', function () use ($app) {
            $configs = $app->container->get('configs');
            $googleData = new GoogleData(
                "LikeDrop",
                APPLICATION_PATH . "configs/" . $configs['service']['gdrive']['client_json_config_filename']);
            $app->redirect($googleData->createAuthUrl());
        });

        $app->get('/redirect', function () use ($app) {
            $configs = $app->container->get('configs');
            $db = $app->container->get('db');
            $securityContext = json_decode($app->getCookie('securityContext'));

            $googleData = new GoogleData(
                "LikeDrop",
                APPLICATION_PATH . "configs/" . $configs['service']['gdrive']['client_json_config_filename']);

            $accessTokenData = $googleData->getAccessToken(
                $app->request->params('code'));

            $result = $db->perform(
                $configs['sql']['account_gdrive']['insert_update_gdrive_user'],
                [
                    'user_id' => $securityContext->id,
                    'access_token' => json_encode($accessTokenData),
                    'refresh_token' => $accessTokenData['refresh_token']
                ]
            );
            $app->redirect('/likedrop');
        });

        $app->get('/thumbnail/:cache_key', function ($cache_key) use ($app) {
            $configs = $app->container->get('configs');
            $file = APPLICATION_PATH .
            $configs['service']['gdrive']['thumbnail_cache_folder'] . "/" . $cache_key;
            $mimeType =  mime_content_type($file);
            if ($mimeType == "image/vnd.adobe.photoshop") {
                $mimeType = "image/jpeg";
            }
            // echo $mimeType; exit();
            header('Content-Type: ' .$mimeType);
            header('Content-Length: ' . filesize($file));
            readfile($file);
            exit();
        });
    });

    $app->group('/instagram', function () use ($app) {

        $app->get('/authorize', function () use ($app) {
            $configs = $app->container->get('configs');
            $instagramData = new InstagramData(
                $configs['service']['instagram']['client_id'],
                $configs['service']['instagram']['client_secret']);

            $app->redirect($instagramData->createAuthUrl(
                "http://".$_SERVER['HTTP_HOST']."/service/instagram/redirect"));
        });

        $app->get('/redirect', function () use ($app) {
            $configs = $app->container->get('configs');
            $db = $app->container->get('db');
            $securityContext = json_decode($app->getCookie('securityContext'));
            $instagramData = new InstagramData(
                $configs['service']['instagram']['client_id'],
                $configs['service']['instagram']['client_secret']);

            $accessTokenData = $instagramData->getAuthTokenFromCode(
                "http://".$_SERVER['HTTP_HOST']."/service/instagram/redirect",
                $app->request->params('code')
            );

            $result = $db->perform(
                $configs['sql']['account_instagram']['insert_update_instagram_user'],
                [
                    'user_id' => $securityContext->id,
                    'access_token' => json_encode($accessTokenData)
                ]
            );
            $app->redirect('/likedrop');
        });
    });

    $app->group('/pocket', function () use ($app) {

        $app->get('/authorize', function () use ($app) {
            $configs = $app->container->get('configs');
            $pocketData = new PocketData(
                $configs['service']['pocket']['consumer_key']);
            $code = $pocketData->fetchRequestCode(
                "http://".$_SERVER['HTTP_HOST']."/service/pocket/redirect");
            $_SESSION['pocketCode'] = $code;
            $app->redirect($pocketData->getAuthorizeScreenUri(
                $code,
                "http://".$_SERVER['HTTP_HOST']."/service/pocket/redirect"
            ));
        });

        $app->get('/redirect', function () use ($app) {
            $configs = $app->container->get('configs');
            $db = $app->container->get('db');
            $securityContext = json_decode($app->getCookie('securityContext'));
            $pocketData = new PocketData(
                $configs['service']['pocket']['consumer_key']);

            $accessTokenData = $pocketData->fetchAccessTokenData(
                $_SESSION['pocketCode']);

            $result = $db->perform(
                $configs['sql']['account_pocket']['insert_update_pocket_user'],
                [
                    'user_id' => $securityContext->id,
                    'username' => $accessTokenData->username,
                    'access_token' => $accessTokenData->access_token
                ]
            );
            $app->redirect('/likedrop');
        });
    });
});