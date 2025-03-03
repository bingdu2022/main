using System;
using System.ComponentModel;
using System.IO;
using System.IO.Compression;
using static System.Net.WebRequestMethods;

public class ZipHelper
{
  public static void Main(string[] args)
  {
    string deployFolder = args[0];  // "C:\Users\BingDu\Downloads\bingdu2022_Git\main\ZipHelper\test\zipping test" - to place its files and folders to deploy/
    string widgetsFolder = args[1];   // "C:\Users\BingDu\Downloads\bingdu2022_Git\main\ZipHelper\test\zipping test 2" - to place its files and folders to widgets/
    string outputZipFile = args[2];   // "C:\Users\BingDu\Downloads\bingdu2022_Git\main\ZipHelper\test\output.zip" to zip deploy/* and widgets/* to it 

    // ZipArchive does not explicitly store empty folders, but it preserves paths for files, so when extracting, the structure remains intact.
    // If you need to include empty folders, you must manually create folder entries inside the ZIP.

    using (FileStream zipToCreate = new FileStream(outputZipFile, FileMode.Create))   // responsible for creating a single zip file on disk.
    using (ZipArchive archive = new ZipArchive(zipToCreate, ZipArchiveMode.Create))   //  responsible for writing multiple files and folder info on disk into that ZIP file.
    {
      // Add the Deploy folder to the zip, preserving the folder structure
      AddDirectoryToZip(archive, deployFolder, "deploy");

      // Add the Widgets folder to the zip, preserving the folder structure
      AddDirectoryToZip(archive, widgetsFolder, "widgets");
    }
  }

  private static void AddDirectoryToZip(ZipArchive archive, string sourceDir, string entryDir)
  {
    // Iterate through all files in the directory and subdirectories
    foreach (var filePath in Directory.GetFiles(sourceDir, "*", SearchOption.AllDirectories))
    {
      // Compute the relative path by removing the root folder part
      string relativePath = Path.Combine(entryDir, filePath.Substring(sourceDir.Length + 1).Replace("\\", "/"));

      // Create an entry for each file, maintaining the folder structure
      archive.CreateEntryFromFile(filePath, relativePath, CompressionLevel.Optimal);  // place each file (with folder info if applicable) to the output.zip
    }
  }
}
