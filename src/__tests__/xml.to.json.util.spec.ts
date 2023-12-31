import { xmlToJsonUtil } from '../xml-to-json-util/xml.to.json.util';

describe('FEATURE: xmlToJsonUtil', () => {
  describe('SCENARIO: xmlToJsonUtil is called with wrong xml parameter', () => {
    it('THEN: it should throw an error', () => {
      const xml = 1 as any;
      expect(() => xmlToJsonUtil(xml)).toThrowError("First paramater 'xml' must be a string");
    });
  });

  describe('SCENARIO: xmlToJsonUtil is called with correct xml parameter', () => {
    it("THEN: it should return object with 'person' property and nested 'name', 'age', and 'city'", () => {
      const xml = `<person>
      <name>João</name>
      <age>30</age>
      <city>São Paulo</city>
    </person>
    `;
      const sut = xmlToJsonUtil(xml);

      expect(sut).toHaveProperty('person');
      expect(sut.person).toHaveProperty('name');
      expect(sut.person).toHaveProperty('age');
      expect(sut.person).toHaveProperty('city');
    });
  });

  describe('SCENARIO: xmlToJsonUtil is called with valid parameters and regex replacements', () => {
    it("THEN: it should return object data without substring 'thisshouldberemoved:' in product property", () => {
      const xmlWithSubstring = `<thisshouldberemoved:product>
        <price>1.1</price>
      </thisshouldberemoved:product>`;
      const substringToRemove = 'thisshouldberemoved:';

      expect(xmlWithSubstring.includes(substringToRemove)).toBeTruthy();

      const regexReplacements = [/thisshouldberemoved:/g];
      const sut = xmlToJsonUtil(xmlWithSubstring, regexReplacements);

      expect(sut).toHaveProperty('product');
      expect(sut.product).toHaveProperty('price');
    });
  });
});
