import { forEach, has, isString, reduce, nth, defaultTo } from 'lodash';
import * as safeJsonParse from 'safe-json-parse/tuple';
import * as xmljs from 'xml-js';

export const xmlToJsonUtil = <T = Record<string, any>>(initialXml: string, xmlReplacementPatterns: RegExp[] = []): T => {
  if (!isString(initialXml)) {
    throw `First paramater 'xml' must be a string`;
  }

  const xml = processXml(xmlReplacementPatterns, initialXml);

  const options: xmljs.Options.XML2JSON = {
    sanitize: true,
    ignoreDoctype: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreAttributes: true,
    ignoreCdata: true,
    compact: true,
    ignoreComment: true,
    spaces: 2,
  };

  const parsedXml = defaultTo(nth(safeJsonParse(xmljs.xml2json(xml, options)), 1), {});

  return flattenObjectProperties(parsedXml) as T;
};

const processXml = (xmlReplacementPatterns: RegExp[], xml: string): string =>
  reduce(xmlReplacementPatterns, (acc: string, regex: RegExp) => acc.replace(regex, ''), xml);

const flattenObjectProperties = (obj: Record<string, any>): Record<string, any> => {
  const propToFlatten: string = '_text';
  forEach(obj, (_, key: string) => {
    if (has(obj[key], propToFlatten)) {
      obj[key] = obj[key][propToFlatten];
    } else {
      flattenObjectProperties(obj[key]);
    }
  });
  return obj;
};
