interface BaseDB {
  connect(): void;
  disconnect(): void;
}

export default BaseDB;
