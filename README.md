# xml-to-json-util

## Description

`xml-to-json-util` is a simple and efficient utility library for converting XML data to JSON format easily. 

## Installation

To install the library in your project, you can use npm. Run the following command in the terminal:

```bash
npm install xml-to-json-util
```

## Basic Usage

Here is a basic example of how to use the library:

**Example 1**
```typescript
import { xmlToJsonUtil } from 'xml-to-json-util';

const xml =
    `<person>
      <name>João</name>
      <age>30</age>
      <city>São Paulo</city>
    </person>
    `;

const parsedXml = xmlToJsonUtil(xml);

console.log(parsedXml);

/*
output:
{
  "person": {
    "name": "João",
    "age": "30",
    "city": "São Paulo"
  }
}
/*
```

**Example 2**
```typescript
import { xmlToJsonUtil } from 'xml-to-json-util';

const xml =
    `<SOAP-ENV:product>
      <ns1:price>1.1</ns1:price>
    </SOAP-ENV:product>
    `;

const xmlReplacementPatterns = [/SOAP-ENV:/g, /ns\d+:/g];
const parsedXml = xmlToJsonUtil(xml, xmlReplacementPatterns);

console.log(parsedXml);

/*
output:
{
  "product": {
    "price": "1.1"
  }
}
/*
```

## License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

I hope the library proves useful in your projects! If you have any questions or issues, feel free to reach out.

### Author
- Andre Drumond das Chagas
- LinkedIn: [linkedin.com/in/andre-drumond](https://br.linkedin.com/in/andre-drumond)
- Github: [https://github.com/andredrumond1995](https://github.com/andredrumond1995)
