<p align="center">
  <img src="https://docs.muil.io/img/favicon.ico" width="120">
</p>

# Muil

[Muil](https://www.muil.io) is a framework to build, maintain, and manage dynamic email, PDF, and image templates using React

## Why Muil

1. Solutions like MJML or Foundation for Emails require your team to learn whole new custom languages, which can be tedious and time-consuming. With Muil, you can build templates using React and tools you already know and love!

2. Take full advantage of React’s declarative and component-based nature which makes coding reusable, fast, simple, and easy to maintain. Our smart platform is designed to significantly improve your ability to cut down on boilerplate and enforce best practices into your work, so you are equipped with the tools and tricks you need to build complex templates faster.

3. While other solutions require that you build and manage a service to render templates, Our free templates render service (app.muil.io) eliminates these concerns. This makes getting started with template development easier, more intuitive, and developer-friendly.

4. When developing emails, it’s vital to ensure templates are compatible across email clients. Muil’s comprehensive library features ready-made, responsive components including charts, buttons, menus, block grids, typography, and more that help you steer clear from complex table markup and inconsistent results.

5. When developing emails, it’s vital to make templates small. Muil automatically stores images in the cloud, inline styles, and minify code.

6. Building dynamic PDF and generating it on the server side is incredibly challenging. Muil lets you take advantage of React and all the other tools you feel comfortable using, so you can build complex PDF templates just as easily as you build Web Apps! With Muil, building dynamic email templates has never been so simple!

## Documentation

[Muil Docs](https://docs.muil.io/docs/getting-started/quickstart)

## Installation

```bash
yarn install
```

## Usage

Set the following environment variables

```
ADMIN_USERNAME=
ADMIN_PASSWORD=
SECRET=
CORS_ORIGIN=
PUPPETEER_EXECUTABLE_PATH=
```

Run the service

```
yarn start
```

## Available environment variables

| Environment Variables     | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| PRIVATE_KEY               | HTTPS Private key                                             |
| PUBLIC_CERTIFICATE        | HTTPS Public Certificate                                      |
| SECRET                    | Authentication token secret                                   |
| HOST_NAME                 | Service hostname / FQDN                                       |
| DATABASE_URL              | SQLite Database file location                                 |
| ADMIN_USERNAME            | Default admin username (will be created on service first run) |
| ADMIN_PASSWORD            | Default admin password                                        |
| TEMPLATES_DIRECTORY       | The templates directory                                       |
| SMTP_DEFAULT_FROM         | Email will be sent with this from email address               |
| SMTP_HOST                 | SMTP Server host                                              |
| SMTP_PORT                 | SMTP Server port                                              |
| SMTP_SECURE               | SMTP Server secure                                            |
| SMTP_USER                 | SMTP Server user                                              |
| SMTP_PASS                 | SMTP Server password                                          |
| CORS_ORIGIN               | List of allowed cors origin hosts                             |
| PUPPETEER_EXECUTABLE_PATH | Path to chrome or firefox executable                          |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
