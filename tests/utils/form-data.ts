'use strict';

type FormDataValue = any;
type FormDataNameValuePair = [string, FormDataValue];

type Headers = { [key: string]: string };
type FormDataPart =
  | {
      string: string;
      headers: Headers;
    }
  | {
      uri: string;
      headers: Headers;
      name?: string;
      type?: string;
    };

class FormData {
  _parts: Array<FormDataNameValuePair>;

  constructor() {
    this._parts = [];
  }

  append(key: string, value: FormDataValue) {
    this._parts.push([key, value]);
  }

  getParts(): Array<FormDataPart> {
    return this._parts.map(([name, value]) => {
      var contentDisposition = 'form-data; name="' + name + '"';

      var headers: Headers = { 'content-disposition': contentDisposition };

      if (typeof value === 'object') {
        if (typeof value.name === 'string') {
          headers['content-disposition'] += '; filename="' + value.name + '"';
        }
        if (typeof value.type === 'string') {
          headers['content-type'] = value.type;
        }
        return { ...value, headers, fieldName: name };
      }

      return { string: String(value), headers, fieldName: name };
    });
  }

  delete() {}

  get(): string | File | null {
    return '';
  }

  getAll(): FormDataEntryValue[] {
    return [];
  }

  has(): boolean {
    return true;
  }

  set() {}

  forEach() {}
}

export default FormData;
