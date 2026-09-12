const fs = require("fs");

const crc32 = (buffer) => {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
};

const uint16 = (value) => {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value, 0);
  return buffer;
};

const uint32 = (value) => {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value >>> 0, 0);
  return buffer;
};

// Creates a standards-compliant ZIP with store-only entries. It avoids a new
// dependency while keeping uploaded files unchanged inside the archive.
const createZip = (entries) => {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  entries.forEach(({ name, buffer }) => {
    const fileName = Buffer.from(String(name).replace(/[\\/]+/g, "_").replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 180));
    const checksum = crc32(buffer);
    const localHeader = Buffer.concat([
      uint32(0x04034b50), uint16(20), uint16(0), uint16(0), uint16(0), uint16(0),
      uint32(checksum), uint32(buffer.length), uint32(buffer.length),
      uint16(fileName.length), uint16(0), fileName,
    ]);
    localParts.push(localHeader, buffer);

    centralParts.push(Buffer.concat([
      uint32(0x02014b50), uint16(20), uint16(20), uint16(0), uint16(0), uint16(0), uint16(0),
      uint32(checksum), uint32(buffer.length), uint32(buffer.length),
      uint16(fileName.length), uint16(0), uint16(0), uint16(0), uint16(0), uint32(0), uint32(offset), fileName,
    ]));
    offset += localHeader.length + buffer.length;
  });

  const centralDirectory = Buffer.concat(centralParts);
  const endRecord = Buffer.concat([
    uint32(0x06054b50), uint16(0), uint16(0), uint16(entries.length), uint16(entries.length),
    uint32(centralDirectory.length), uint32(offset), uint16(0),
  ]);

  return Buffer.concat([...localParts, centralDirectory, endRecord]);
};

const createZipFromFiles = (entries, destPath) => {
  const fd = fs.openSync(destPath, "w");
  let offset = 0;
  const centralParts = [];

  try {
    entries.forEach(({ name, path: filePath }) => {
      const buffer = fs.readFileSync(filePath);
      const fileName = Buffer.from(String(name).replace(/[\\/]+/g, "_").replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 180));
      const checksum = crc32(buffer);
      const localHeader = Buffer.concat([
        uint32(0x04034b50), uint16(20), uint16(0), uint16(0), uint16(0), uint16(0),
        uint32(checksum), uint32(buffer.length), uint32(buffer.length),
        uint16(fileName.length), uint16(0), fileName,
      ]);
      fs.writeSync(fd, localHeader);
      fs.writeSync(fd, buffer);
      centralParts.push(Buffer.concat([
        uint32(0x02014b50), uint16(20), uint16(20), uint16(0), uint16(0), uint16(0), uint16(0),
        uint32(checksum), uint32(buffer.length), uint32(buffer.length),
        uint16(fileName.length), uint16(0), uint16(0), uint16(0), uint16(0), uint32(0), uint32(offset), fileName,
      ]));
      offset += localHeader.length + buffer.length;
    });

    const centralDirectory = Buffer.concat(centralParts);
    const endRecord = Buffer.concat([
      uint32(0x06054b50), uint16(0), uint16(0), uint16(entries.length), uint16(entries.length),
      uint32(centralDirectory.length), uint32(offset), uint16(0),
    ]);
    fs.writeSync(fd, centralDirectory);
    fs.writeSync(fd, endRecord);
  } finally {
    fs.closeSync(fd);
  }

  return destPath;
};

module.exports = { createZip, createZipFromFiles };
