# LRM stub for testing purposes

## Configuration

For simpler usage and faster query building, default options and selected values can be specified by modifying
respectively the values in `items` and `form` in `stubs/dashboard/pages/index.vue`.

See [this commit](https://github.com/ansforge/SAMU-interface-LRM/commit/56f274a178e51db82ba9c6de58cfdc1edeb5adc0) for an
example.

_Note: default selected values for patients don't work because of internal logic._

## Usage locally

Open 3 terminals and run

```
# UI -> localhost:3000
cd stubs/dashboard && npm install --production=false && npm run setup && npm run dev
# LRM stub -> localhost:8081
cd stubs/lrm && npm install && npm run dev
# SI-SAMU stub -> localhost-> 8080
cd stubs/si-samu && npm install && npm run dev
```

## Deployment

The LRM stub is deployed on Heroku -> [UI](https://interface-tester.herokuapp.com/ui/) and serves a Nuxt SSG version of
the UI.
