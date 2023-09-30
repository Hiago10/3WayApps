# 3WayApps

O projeto 3WayApps envolve a integração de três aplicações distintas, cada uma hospedada em seus próprios contêineres e redes. Essas aplicações serão comunicáveis por meio de um reverse proxy.

## Executar o Projeto Localmente 

1. Inicie executando o arquivo `docker-compose.yml`, que está localizado na raiz do projeto. O Docker Compose tem a responsabilidade de criar imagens personalizadas para cada aplicação Node.js e criar os containers dessas aplicações, bem como de instanciar contêineres MySQL dedicados para cada aplicação, e um contêiner NGINX.

> **Requisito:** É necessário ter o Docker instalado em sua máquina host.

Existem dois modos do projeto ser executado:

**Modo Interativo (com acesso aos logs):**
```bash
docker compose up
```
**Modo Desanexado (em segundo plano):**
```bash
docker compose up -d
```
2. Configure o arquivo `hosts` do Docker host para associar o endereço IP local 127.0.0.1 aos seguintes nomes de domínio: teste1.com, teste2.com e teste3.com. Isso é necessário porque o NGINX usa a diretiva `server_name` para direcionar as solicitações para as aplicações desejadas, sendo teste1.com associado a app-contatos, teste2.com associado a app-livros e teste3.com associado a app-filmes.  

Após configurar o arquivo de hosts, as aplicações estarão disponíveis para acesso:

-   [teste1.com](http://teste1.com/)
-   [teste2.com](http://teste2.com/)
-   [teste3.com](http://teste3.com/)