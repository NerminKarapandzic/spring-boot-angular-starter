export function randomBucketSuffix() {
  return Math.random().toString(36).substr(2, 6);
}
