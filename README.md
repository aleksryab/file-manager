# File Manager

File Manager using Node.js APIs.

## Description

The file manager can do the following:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

## Commands

Start program:

```bash
npm run start -- --username=your_username
```

- Navigation & working directory
  - Go upper from current directory:
  ```bash
  up
  ```
  - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute):
  ```bash
  cd path_to_directory
  ```
  - Print in console list of all files and folders in current directory:
  ```bash
  ls
  ```
- Basic operations with files
  - Read file and print it's content in console:
  ```bash
  cat path_to_file
  ```
  - Create empty file in current working directory:
  ```bash
  add new_file_name
  ```
  - Rename file (content should remain unchanged):
  ```bash
  rn path_to_file new_filename
  ```
  - Copy file:
  ```bash
  rn cp path_to_file path_to_new_directory
  ```
  - Move file (same as copy but initial file is deleted):
  ```bash
  mv path_to_file path_to_new_directory
  ```
  - Delete file:
  ```bash
  rm path_to_file
  ```
- Operating system info (prints following information in console)
  - Get EOL (default system End-Of-Line) and print it to console:
  ```bash
  os --EOL
  ```
  - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console:
  ```bash
  os --cpus
  ```
  - Get home directory and print it to console:
  ```bash
  os --homedir
  ```
  - Get current _system user name_ and print it to console:
  ```bash
  os --username
  ```
  - Get CPU architecture for which Node.js binary has compiled and print it to console:
  ```bash
  os --architecture
  ```
- Hash calculation
  - Calculate hash for file and print it into console:
  ```bash
  hash path_to_file
  ```
- Compress and decompress operations
  - Compress file (using Brotli algorithm):
  ```bash
  compress path_to_file path_to_destination
  ```
  - Decompress file (using Brotli algorithm):
  ```bash
  decompress path_to_file path_to_destination
  ```
