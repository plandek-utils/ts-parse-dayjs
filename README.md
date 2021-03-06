# `@plandek-utils/ts-parse-dayjs`

[![npm version](https://badge.fury.io/js/%40plandek-utils%2Fts-parse-dayjs.svg)](https://badge.fury.io/js/%40plandek-utils%2Fts-parse-dayjs)
[![Build Status](https://travis-ci.org/plandek-utils/ts-parse-dayjs.svg?branch=master)](https://travis-ci.org/plandek-utils/ts-parse-dayjs)
[![Maintainability](https://api.codeclimate.com/v1/badges/347bf1114fa660524fd8/maintainability)](https://codeclimate.com/github/plandek-utils/ts-parse-dayjs/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/347bf1114fa660524fd8/test_coverage)](https://codeclimate.com/github/plandek-utils/ts-parse-dayjs/test_coverage)

[TypeDoc generated docs in here](https://plandek-utils.github.io/ts-parse-dayjs)

[Github repo here](https://github.com/plandek-utils/ts-parse-dayjs)

utils to parse Dayjs objects in UTC

## Installation

`yarn add @plandek-utils/ts-parse-dayjs` or `npm install @plandek-utils/ts-parse-dayjs`.

## Usage

Note: it will return Dayjs objects with plugins:

- [`AdvancedFormat`](https://day.js.org/docs/en/plugin/advanced-format)
- [`Duration`](https://day.js.org/docs/en/plugin/duration)
- [`IsBetween`](https://day.js.org/docs/en/plugin/is-between)
- [`IsSameOrAfter`](https://day.js.org/docs/en/plugin/is-same-or-after)
- [`IsSameOrBefore`](https://day.js.org/docs/en/plugin/is-same-or-before)
- [`MinMax`](https://day.js.org/docs/en/plugin/min-max)
- [`RelativeTime`](https://day.js.org/docs/en/plugin/relative-time)
- [`UTC`](https://day.js.org/docs/en/plugin/utc)
- [`WeekOfYear`](https://day.js.org/docs/en/plugin/week-of-year)

### `parseDayjs`

parses the given input and returns a Dayjs object (in UTC) if the given date is valid, or `null` if it results in an invalid date

```typescript
import { parseDayjs } from "@plandek-utils/ts-parse-dayjs";

parseDayjs(null); // => null
parseDayjs(""); // => null
parseDayjs("waa"); // => null
parseDayjs("2018-01-01"); // => Dayjs object in UTC for 2018-01-01
parseDayjs("2018-01-01T00:00:00.000Z"); // => Dayjs object in UTC for 2018-01-01T00:00:00.000Z
parseDayjs(new Date()); // => Dayjs object in UTC for the given Date
parseDayjs(dayjsObject); // => same Dayjs object

// can be formatted
parseDayjs("2018-01-01T00:00:00.000Z").format("Do MMM YYYY"); // => 1st Jan 2018
```

#### Locale

By default the locale used is `en-gb`. This package import automatically all the english locales.

You can explicitly ask for a different locale passing a second argument. It can be one of the AvailableLocales or one of the Dayjs locale objects:

**note: BREAKING CHANGE from 1.x to 2.x: default locale changed from `en` to `en-gb`**
**note: BREAKING CHANGE from 2.x to 3.x: The second argument is now an object like `{ locale: "new-locale" }` instead of the locale directly**

```typescript
import { parseDayjs, AvailableLocales } from "@plandek-utils/ts-parse-dayjs";

parseDayjs("2018-01-01"); // => Dayjs object in UTC for 2018-01-01, locale en-gb (week starts on Monday)
parseDayjs("2018-01-01", { locale: AvailableLocales.EnglishUSA }); // => Dayjs object in UTC for 2018-01-01, locale en (week starts on Sunday)

import esLocale from "dayjs/locale/es";
parseDayjs("2018-01-01", { locale: esLocale }); // => Dayjs object in UTC for 2018-01-01, locale es (spanish)
```

#### `strict` option

By passing `strict: true` in the options, we ensure that we will receive a Dayjs object, or throw an `InvalidDateError`. This is the same as [`parseDayjsOrError`](#parsedayjsorerror).

```typescript
import { parseDayjs } from "@plandek-utils/ts-parse-dayjs";

parseDayjs("2018-01-01", { strict: true }); // => Dayjs object in UTC for 2018-01-01, locale en-gb (week starts on Monday)
parseDayjs("waaaa", { strict: true }); // => throws InvalidDateError
```

### `dayjsNow`

returns a Dayjs (in UTC) of the current time. It can accept a locale as optional argument (see [Locale](#locale))

```typescript
import { dayjsNow, AvailableLocales } from "@plandek-utils/ts-parse-dayjs";

dayjsNow(); // => Dayjs object with the current time, in UTC (locale en-gb)
dayjsNow({ locale: AvailableLocales.EnglishUSA }); // => Dayjs object with the current time, in UTC (locale en)

import esLocale from "dayjs/locale/es";
dayjsNow({ locale: esLocale }); // => Dayjs with the current time, in UTC, locale es
```

### `parseDayjsOrError`

same as [`parseDayjs`](#parseDayjs) but instead of returning `null` on an invalid date, it throws an `InvalidDateError`. It can accept an optional second argument locale (see [Locale](#locale))

```typescript
import { parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";

parseDayjsOrError("2018-01-01T00:00:00.000Z"); // => Dayjs object in UTC for 2018-01-01T00:00:00.000Z
parseDayjsOrError(null); // => throws InvalidDateError
```

note: this is the same as passing a `strict: true` option to parseDayJs

### `parseDayjsStartOfDay` and `parseDayjsEndOfDay`

same as [`parseDayjs`](#parseDayjs) but if it results in a valid Dayjs object, it will then modify it to be at the beginning or end of the UTC day. It can accept an optional second argument locale (see [Locale](#locale))

```typescript
import { parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";

parseDayjsStartOfDay(null); // => null
parseDayjsEndOfDay(null); // => null
parseDayjsStartOfDay("2018-01-01"); // => Dayjs object in UTC for 2018-01-01T00:00:00.000Z
parseDayjsEndOfDay("2018-01-01"); // => Dayjs object in UTC for 2018-01-01T23:59:59.999Z
```

### `parseFromStandardPeriods`

given a string like `8d`, `12w`, `9m` or `2y`, it returns an object with the calculated range of 8 days, 12 weeks, 9 months and 2 years ago respectively.

Optionally we can set an origin as second argument, otherwise the current time is used.

**note: BREAKING CHANGE from 2.x to 3.x: The second argument is now an object like `{ origin: originDate }` instead of the origin directly**

If the string cannot be parsed correctly, it will return `null`.

If the string is parsed correctly, it will return an object with:

- `to`: the given origin (or current time if missing), at EOD of UTC (e.g. today at 23:59:59.999Z)
- `from`: the calculated `from` after subtracting the given amount of the given unit, at the beginning of the period (beginning of the day, of the week, of the month or of the year)

```typescript
import { parseFromStandardPeriods, parseDayjs } from "@plandek-utils/ts-parse-dayjs";

// if "now" is 2019-10-22T12:34:56.123Z

parseFromStandardPeriods(""); // => null
parseFromStandardPeriods("wat"); // => null
parseFromStandardPeriods("10z"); // => null
parseFromStandardPeriods("10d");
// => { from: Dayjs(2019-10-12T00:00:00.000Z), to: Dayjs(2019-10-22T23:59:59.999Z) }
parseFromStandardPeriods("2w");
// => { from: Dayjs(2019-10-07T00:00:00.000Z), to: Dayjs(2019-10-22T23:59:59.999Z) }
parseFromStandardPeriods("2m");
// => { from: Dayjs(2019-08-01T00:00:00.000Z), to: Dayjs(2019-10-22T23:59:59.999Z) }
parseFromStandardPeriods("2y");

// if the number is 0, it will go to the beginning of the period
parseFromStandardPeriods("0d");
// => { from: Dayjs(2019-10-22T00:00:00.000Z), to: Dayjs(2019-10-22T23:59:59.999Z) }
parseFromStandardPeriods("0w");
// => { from: Dayjs(2019-10-21T00:00:00.000Z), to: Dayjs(2019-10-22T23:59:59.999Z) }
parseFromStandardPeriods("0m");
// => { from: Dayjs(2019-10-01T00:00:00.000Z), to: Dayjs(2019-10-22T23:59:59.999Z) }
parseFromStandardPeriods("0y");
// => { from: Dayjs(2019-01-01T00:00:00.000Z), to: Dayjs(2019-10-22T23:59:59.999Z) }

// with optional origin
const d = parseDayjs("2019-05-10");
parseFromStandardPeriods("3d", { origin: d });
// => { from: Dayjs(2019-05-07T00:00:00.000Z), to: Dayjs(2019-05-10T23:59:59.999Z) }
```

### `formatDate()`

Used to format a Dayjs object using the AdvancedFormat plugin. The default format is `"Do MMM YYYY"`

```typescript
import { formatDate, parseDayjs } from "@plandek-utils/ts-parse-dayjs";

formatDate(null); // => null
formatDate(parseDayjs("2019-01-02")); // => "2nd Jan 2019"
formatDate(parseDayjs("2019-01-02"), "Do ww MMMM YYYY"); // => "2nd 01 January 2019"
```

### `minDayjs()` and `maxDayjs()`

Used to compare an array of Dayjs objects and return the min (earliest) or max (latest).

```typescript
import { minDayjs, maxDayjs, parseDayjs } from "@plandek-utils/ts-parse-dayjs";
const d1 = parseDayjsOrError("2019-01-01");
const d2 = parseDayjsOrError("2019-02-02");
const d3 = parseDayjsOrError("2019-03-03");
const d4 = parseDayjsOrError("2019-04-04");

minDayjs([]); // => null
minDayjs([d3, d4, d1, d2]); // => d1

maxDayjs([]); // => null
maxDayjs([d3, d4, d1, d2]); // => d4
```

### `isStrictDayjsInput()` and `isDayjsInput()`

return true if the given input is a valid DayjsInput (`Date`, Dayjs object, string or number):

- `isDayjsInput` allows for `null` or `undefined`
- `isStrictDayjsInput` does not allow for `null` or `undefined`

### `isValidDate()`

returns true if the given string, dayjs or Date object represent a valid date, false otherwise. It always returns false if given `null` or `undefined`

```typescript
import { isValidDate, parseDayjs } from "@plandek-utils/ts-parse-dayjs";

isValidDate(null); // => false
isValidDate(undefined); // => false
isValidDate("2012-12-15"); // => true
isValidDate("2012-12-15T12:31:31Z"); // => true
isValidDate("2012-12-15T12:31:97Z"); // => false
isValidDate("2012-12-32T12:31:00Z"); // => false
isValidDate("2012-12-32"); // => false
isValidDate(new Date("2012-12-15")); // => true
isValidDate(new Date("2012-12-15T12:31:31Z")); // => true
isValidDate(new Date("2012-12-15T12:31:97Z")); // => false
isValidDate(new Date("2012-12-32T12:31:00Z")); // => false
isValidDate(new Date("2012-12-32")); // => false
isValidDate(parseDayjs("2012-12-15")); // => true
isValidDate(parseDayjs("2012-12-15T12:31:31Z")); // => true
isValidDate(parseDayjs("2012-12-15T12:31:97Z")); // => false
isValidDate(parseDayjs("2012-12-32T12:31:00Z")); // => false
isValidDate(parseDayjs(new Date("2012-12-32"))); // => false
```

### `durationBetween(a, b)`

returns the `Duration` type of `b.diff(a)`

We also have `isDuration(x)` function.

```typescript
import { durationBetween, parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";

const a = parseDayjsOrError("2012-12-15T12:31:31Z");
const b = parseDayjsOrError("2012-12-15T12:31:41Z");

const d = durationBetween(a, b);
d.asSeconds() // => 10

isDuration(d) // => true
```

## Development, Commits, versioning and publishing

<details><summary>See documentation for development</summary>
<p>

See [The Typescript-Starter docs](https://github.com/bitjson/typescript-starter#bump-version-update-changelog-commit--tag-release).

### Commits and CHANGELOG

For commits, you should use [`commitizen`](https://github.com/commitizen/cz-cli)

```sh
yarn global add commitizen

#commit your changes:
git cz
```

As typescript-starter docs state:

This project is tooled for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) to make managing releases easier. See the [standard-version](https://github.com/conventional-changelog/standard-version) documentation for more information on the workflow, or [`CHANGELOG.md`](CHANGELOG.md) for an example.

```sh
# bump package.json version, update CHANGELOG.md, git tag the release
yarn run version
```

You may find a tool like [**`wip`**](https://github.com/bitjson/wip) helpful for managing work in progress before you're ready to create a meaningful commit.

### Creating the first version

Once you are ready to create the first version, run the following (note that `reset` is destructive and will remove all files not in the git repo from the directory).

```sh
# Reset the repo to the latest commit and build everything
yarn run reset && yarn run test && yarn run doc:html

# Then version it with standard-version options. e.g.:
# don't bump package.json version
yarn run version -- --first-release

# Other popular options include:

# PGP sign it:
# $ yarn run version -- --sign

# alpha release:
# $ yarn run version -- --prerelease alpha
```

And after that, remember to [publish the docs](#publish-the-docs).

And finally push the new tags to github and publish the package to npm.

```sh
# Push to git
git push --follow-tags origin master

# Publish to NPM (allowing public access, required if the package name is namespaced like `@somewhere/some-lib`)
yarn publish --access public
```

### Publish the Docs

```sh
yarn run doc:html && yarn run doc:publish
```

This will generate the docs and publish them in github pages.

### Generate a version

There is a single yarn command for preparing a new release. See [One-step publish preparation script in TypeScript-Starter](https://github.com/bitjson/typescript-starter#one-step-publish-preparation-script)

```sh
# Prepare a standard release
yarn prepare-release

# Push to git
git push --follow-tags origin master

# Publish to NPM (allowing public access, required if the package name is namespaced like `@somewhere/some-lib`)
yarn publish --access public
```

</p>
</details>
