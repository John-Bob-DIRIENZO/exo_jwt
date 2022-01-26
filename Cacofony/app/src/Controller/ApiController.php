<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\SshKeyHelper;
use Cacofony\BaseClasse\BaseController;
use App\Manager\UserManager;
use Firebase\JWT\JWT;

class ApiController extends BaseController
{
    /**
     * @Route(path="/", name="homePage")
     */
    public function getHome(SshKeyHelper $keyHelper)
    {
//        var_dump($keyHelper->getPublicKey());
        var_dump(serialize(['ROLE_ADMIN']));
    }

    /**
     * @Route(path="/api/user-token", name="userToken")
     * @param UserManager $userManager
     * @param SshKeyHelper $keyHelper
     * @return void
     */
    public function getUserToken(UserManager $userManager, SshKeyHelper $keyHelper)
    {
        /** @var $user User */
        $user = $userManager->findOneBy('email', $_SERVER['PHP_AUTH_USER'] ?? '');
        if ($user && $user->isPasswordValid($_SERVER['PHP_AUTH_PW'])) {
            $this->renderJSON([
                'status' => 1,
                'jwt' => JWT::encode(
                    [
                        'exp' => (new \DateTime('+10 minutes'))->getTimestamp(),
                        'email' => $user->getEmail(),
                        'firstName' => $user->getFirstName(),
                        'lastName' => $user->getLastName(),
                        'roles' => $user->getRoles()
                    ],
                    $keyHelper->getPrivateKey(), 'RS256'),
                'pubic-key' => $keyHelper->getPublicKey()
            ]);
        } else {
            $this->renderJSON([
                'status' => 0,
                'message' => 'No user found'
            ]);
        }
    }

    /**
     * @Route(path="/show")
     * @return void
     */
    public function getShowTest()
    {
        $this->renderJSON(['message' => 'Je suis bien la bonne méthode']);
    }

    /**
     * @Route(path="/show")
     * @return void
     */
    public function postShowTest()
    {
        $this->renderJSON(['message' => 'Ca marche aussi en fonction de la méthode, testez moi !']);
    }
}