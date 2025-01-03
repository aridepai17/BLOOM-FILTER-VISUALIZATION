# Bloom Filter App: Theory and Logic

## A Bloom filter is a space-efficient probabilistic data structure designed to test whether an element is a member of a set. It is particularly useful for applications where memory usage is critical, and occasional false positives are acceptable, but false negatives are not.

## How the Bloom Filter Works

### Bit Array Initialization:
- A Bloom filter uses a fixed-size array of bits, all initially set to 0.
- In our app, this array has a length of 20.

### Hash Functions:
- A set of independent hash functions is used to compute indices in the bit array.
- Each hash function maps an input (e.g., a string) to a specific index in the array.
- The indices are calculated using modular arithmetic to ensure they fall within the bounds of the array.

### Adding an Element:
- When an element is added, it is processed by all the hash functions.
- Each hash function returns an index, and the bits at those indices in the array are set to 1.
- If the same element is added again, the same indices are set to 1 again, but this has no additional effect.

### Checking for Membership:
- To check if an element is in the set, it is hashed by all the hash functions.
- The corresponding bits in the array are inspected.
- If all the bits at the computed indices are 1, the element is possibly in the set.
- If any of these bits is 0, the element is definitely not in the set.

### False Positives:
- The Bloom filter can mistakenly report that an element is in the set when it is not. This is known as a false positive.
- False positives occur because multiple elements can set the same bits, leading to overlapping indices.
- However, Bloom filters never produce false negatives (i.e., they will not fail to recognize an element that was added).

## Logic Behind the App

### Bit Array Representation:
- The app uses a `bitArray` of length 20, initialized with zeros.
- When elements are added, specific indices in this array are set to 1 based on the hash functions.

### Hash Functions:
- Three hash functions are implemented, each producing a unique index for a given input.
- They operate on the input string by iterating through its characters, performing arithmetic operations, and using modular arithmetic.

### Add Operation:
- When a user enters an element to add, all hash functions compute their respective indices.
- The bits at these indices in the `bitArray` are updated to 1.
- The element is stored in the `addedElements` array for visual tracking (optional for user interface purposes).

### Check Operation:
- The app verifies membership by hashing the input with all hash functions and inspecting the corresponding bits in the `bitArray`.
- If all bits are 1, the app indicates that the element is "possibly in set."
- If any bit is 0, the app concludes that the element is "definitely not in set."

### Visualization:
- The bit array is displayed graphically to help users understand the internal state.
- The "check operation bit array" highlights the bits that were checked, making the process more transparent.

## Use Cases of Bloom Filters
- **Web Caching**: Determine if a URL is already cached.
- **Database Query Optimization**: Quickly test if a record exists.
- **Spam Detection**: Filter out known spam messages or addresses.
- **Blockchain and Distributed Systems**: Validate transactions or data blocks without storing the entire dataset.

## Advantages of Bloom Filters
- Extremely memory efficient compared to other data structures like hash sets.
- Simple and fast to implement and use.
- Useful in scenarios where approximate results are acceptable.

## Limitations
- Cannot remove elements without reinitializing the filter.
- The probability of false positives increases as more elements are added.
- The accuracy depends on the size of the bit array and the number of hash functions.

This app demonstrates these concepts interactively, providing users with a hands-on experience of how Bloom filters operate.