# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v2.0.0...v3.0.0) (2019-10-29)


### ⚠ BREAKING CHANGES

* The optional argument of the custom origin has been replaced by an optional object
with all the options. The first option available is the `origin`. e.g.
`parseFromStandardPeriods("1d", customOrigin)` => `parseFromStandardPeriods("1d", { origin:
customOrigin })`
* The optional argument of the custom locale has been replaced by an optional object
with all the options. The first one of which is locale. e.g. `parseDayjs(d, customLocale)` =>
`parseDayjs(d, { locale: customLocale })`

### Features

* options object with `strict` option + `time` adapt option + refactor ([#2](https://github.com/plandek-utils/ts-parse-dayjs/issues/2)) ([8a26e5f](https://github.com/plandek-utils/ts-parse-dayjs/commit/8a26e5fbdd98029e037a3af88fd4ed576ca8d788))
* second argument as option hash instead of directly the locale ([400613b](https://github.com/plandek-utils/ts-parse-dayjs/commit/400613bb47e12aa81d71f41774d4ffcdc8912c3a))
* second argument as option hash instead of directly the origin (parseFromStandardPeriods) ([f976d3e](https://github.com/plandek-utils/ts-parse-dayjs/commit/f976d3ed53bb78e0627fa614a2df228625791032))

## [2.0.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v1.2.0...v2.0.0) (2019-10-28)

### Features

* add Locale support + include english locales by default + default locale en-gb ([99f0c72](https://github.com/plandek-utils/ts-parse-dayjs/commit/99f0c728f24c235613f61e57e2de40c74e34e4b4))
* parseFromStandardPeriods() and Ranges ([1bc2ff7](https://github.com/plandek-utils/ts-parse-dayjs/commit/1bc2ff7617d61d06a63c9611d05339c6749e0ea4))


### ⚠ BREAKING CHANGES

* the Dayjs objects returned by the functions in this lib will now use `en-gb` locale
by default instead of `en` (USA English)

* mark as Breaking Change the new default locale ([ca59898](https://github.com/plandek-utils/ts-parse-dayjs/commit/ca59898a81693807956e8e3ed318681f0abcc77a))

## [1.1.0](https://github.com/plandek-utils/ts-parse-dayjs/compare/v1.0.0...v1.1.0) (2019-10-25)


### Features

* exporting DayjsInput type ([56d6eb7](https://github.com/plandek-utils/ts-parse-dayjs/commit/56d6eb72f958bc8fd3161c058b84d5c6f4a1a824))

## 1.0.0 (2019-10-23)


### Features

* initial parseDayjs parseDayjsOrError parseDayjsStartOfDay parseDayjsEndOfDay ([f92c010](https://github.com/plandek-utils/ts-parse-dayjs/commit/f92c010df80d8d7486a63f3393501c3ae47cb4c1))

## 1.0.0 (2019-10-23)


### Features

* initial parseDayjs parseDayjsOrError parseDayjsStartOfDay parseDayjsEndOfDay ([f92c010](https://github.com/plandek-utils/ts-parse-dayjs/commit/f92c010df80d8d7486a63f3393501c3ae47cb4c1))

## 1.0.0 (2019-10-23)
