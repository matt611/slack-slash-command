
/**
 *  This is a simple, hacked, in memory storage for keeping track of links
 *  It's meant to be used as a singleton.  Restarting the server will erase 
 *  all data and start fresh.
 */
class Storage {
  data: {[key: string]: string};
  stats: {[key: string]: number};
  constructor() {
    // initialize some starting data
    this.data = {
      cand: 'https://www.candombe.dev',
      goog: 'https://www.google.com',
      tube: 'https://www.youtube.com',
    };
    this.stats = {
      cand:0,
      goog:0,
      tube:0,
    }
  }

  get(key: string): string {
    return this.data[key];
  }

  getAllKeys(): string[] {
    return Object.keys(this.data);
  }

  set(key: string, value: string) {
    this.data[key] = value;
  }

  delete(key: string) {
    delete this.data[key];
  }

  incStat(key: string) {
    this.stats[key]++;
  }

  getAllStats() {
    return Object.entries(this.stats).map(kvPair => {
      return {key: kvPair[0], value: kvPair[1]};
    });
  }
}

const storage = new Storage();

export default storage;