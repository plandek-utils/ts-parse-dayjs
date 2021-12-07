// tslint:disable:no-submodule-imports
// tslint:disable:interface-name
import { Dayjs, PluginFunc } from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";

type Input = Dayjs | Date | string | number | null | undefined;

type FromToBaseFn = (
  input: Input,
  withoutSuffix: boolean | undefined,
  instance: Dayjs,
  isFrom?: boolean,
  postFormat?: (x: string) => string
) => string;

declare module "dayjs" {
  interface Dayjs {
    fromToBase: FromToBaseFn;

    fromNow(withoutSuffix?: boolean): string;

    from(compared: Input, withoutSuffix?: boolean): string;

    toNow(withoutSuffix?: boolean): string;

    to(compared: Input, withoutSuffix?: boolean): string;

    fromNowStrict(withoutSuffix?: boolean): string;

    fromStrict(compared: Input, withoutSuffix?: boolean): string;

    toNowStrict(withoutSuffix?: boolean): string;

    toStrict(compared: Input, withoutSuffix?: boolean): string;
  }
}

const OPTIONS_RELATIVE = {};
const OPTIONS_STRICT = {
  rounding: Math.floor,
  thresholds: [
    { l: "s", r: 1 },
    { l: "ss", r: 59, d: "second" },
    { l: "m", r: 1 },
    { l: "mm", r: 59, d: "minute" },
    { l: "h", r: 1 },
    { l: "hh", r: 23, d: "hour" },
    { l: "d", r: 1 },
    { l: "dd", r: 29, d: "day" },
    { l: "M", r: 1 },
    { l: "MM", r: 11, d: "month" },
    { l: "y", r: 1 },
    { l: "yy", d: "year" },
  ],
};

export const relativeTimeStrictPlugin: PluginFunc<Record<any, never>> = (_o, c, d) => {
  const proto = c.prototype;
  // we call the original plugin
  relativeTimePlugin(OPTIONS_RELATIVE, c, d);
  const fromToBaseRelative = c.prototype.fromToBase;

  // we call the original plugin
  relativeTimePlugin(OPTIONS_STRICT, c, d);
  const fromToBaseStrict = c.prototype.fromToBase;

  proto.to = function (input, withoutSuffix) {
    return fromToBaseRelative(input, withoutSuffix, this, true);
  };
  proto.toStrict = function (input, withoutSuffix) {
    return fromToBaseStrict(input, withoutSuffix, this, true);
  };

  proto.from = function (input, withoutSuffix) {
    return fromToBaseRelative(input, withoutSuffix, this);
  };
  proto.fromStrict = function (input, withoutSuffix) {
    return fromToBaseStrict(input, withoutSuffix, this);
  };

  const makeNow = (thisDay: Dayjs) => (thisDay.isUTC() ? d.utc() : d());

  proto.toNow = function (withoutSuffix) {
    return this.to(makeNow(this), withoutSuffix);
  };
  proto.toNowStrict = function (withoutSuffix) {
    return this.toStrict(makeNow(this), withoutSuffix);
  };

  proto.fromNow = function (withoutSuffix) {
    return this.from(makeNow(this), withoutSuffix);
  };
  proto.fromNowStrict = function (withoutSuffix) {
    return this.fromStrict(makeNow(this), withoutSuffix);
  };
};
