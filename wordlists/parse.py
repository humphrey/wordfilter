import json

# Input: Replace this with your actual word-frequency data
with open('./freq.txt', 'r') as f:
  raw_data = f.read()

# Parse the raw data
lines = raw_data.strip().splitlines()   # Split into lines
words = [line.split()[0] for line in lines]  # Extract the first element (word) from each line

# Generate plain text file
with open("freq.words.txt", "w") as txt_file:
    txt_file.write("\n".join(words))  # Join words with a newline and write to file

# Generate JSON file
with open("freq.words.json", "w") as json_file:
    json.dump(words, json_file, indent=2)  # Write words as a JSON array with indentation for readability

print("Files 'wordlist.txt' and 'wordlist.json' have been successfully created.")