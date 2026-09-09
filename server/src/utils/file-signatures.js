const hasPrefix = (buffer, bytes) =>
  Buffer.isBuffer(buffer) && buffer.length >= bytes.length && bytes.every((value, index) => buffer[index] === value);

const isPdfBuffer = (buffer) => hasPrefix(buffer, [0x25, 0x50, 0x44, 0x46]); // %PDF

const isZipBuffer = (buffer) => hasPrefix(buffer, [0x50, 0x4b, 0x03, 0x04]) || hasPrefix(buffer, [0x50, 0x4b, 0x05, 0x06]);

const isOleBuffer = (buffer) => hasPrefix(buffer, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);

const extensionOf = (name = "") => {
  const match = String(name).toLowerCase().match(/(\.[a-z0-9]+)$/);
  return match ? match[1] : "";
};

module.exports = {
  isPdfBuffer,
  isZipBuffer,
  isOleBuffer,
  extensionOf,
};
