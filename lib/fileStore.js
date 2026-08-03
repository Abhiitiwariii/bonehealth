// Stores uploaded report files (photos, PDFs) in this browser's IndexedDB.
// Files never leave the device and are never opened or read by the app.
// They are only saved so the person can view or download their own file
// again later, the same way a folder on their phone would.

const DB_NAME = "arogya-reports";
const STORE_NAME = "files";
const DB_VERSION = 1;

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveReportFile(file) {
  const db = await openDb();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const record = {
    id,
    name: file.name,
    type: file.type,
    size: file.size,
    addedAt: new Date().toISOString(),
    blob: file,
  };
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(record);
    tx.oncomplete = () => resolve(id);
    tx.onerror = () => reject(tx.error);
  });
}

export async function listReportFiles() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => {
      const records = req.result || [];
      records.sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1));
      resolve(
        records.map((r) => ({
          id: r.id,
          name: r.name,
          type: r.type,
          size: r.size,
          addedAt: r.addedAt,
          url: URL.createObjectURL(r.blob),
        }))
      );
    };
    req.onerror = () => reject(req.error);
  });
}

export async function deleteReportFile(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
