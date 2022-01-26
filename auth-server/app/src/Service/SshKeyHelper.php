<?php

namespace App\Service;

class SshKeyHelper
{
    public function keyExists(): bool
    {
        return file_exists(dirname(__DIR__, 2) . '/ssh-keys/jwtRS256.key');
    }

    public function getPrivateKey(): \OpenSSLAsymmetricKey|bool
    {
        if (!$this->keyExists()) {
            $this->createPrivateKey();
        }
        $file = file_get_contents(dirname(__DIR__, 2) . '/ssh-keys/jwtRS256.key');
        return openssl_get_privatekey($file);
    }

    public function getPublicKey(): string
    {
        if (!$this->keyExists()) {
            $this->createPrivateKey();
        }
        $file = file_get_contents(dirname(__DIR__, 2) . '/ssh-keys/jwtRS256.key');
        $private_key = openssl_get_privatekey($file);
        return str_replace(["\n","\r"], '', openssl_pkey_get_details($private_key)['key']);
    }

    public function createPrivateKey(): void
    {
        // Create the keypair
        $res = openssl_pkey_new();
        // Get private key
        openssl_pkey_export($res, $privkey);
        $keyFile = fopen(dirname(__DIR__, 2) . '/ssh-keys/jwtRS256.key', 'w');
        fwrite($keyFile, $privkey);
        fclose($keyFile);
    }
}