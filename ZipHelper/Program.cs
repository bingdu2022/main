using System;
using System.IO;
using System.IO.Compression;

public class ZipHelper
{
  public static void Main(string[] args)
  {
    string deployFolder = args[0];
    string widgetsFolder = args[1];
    string outputZipFile = args[2];

    using (FileStream zipToCreate = new FileStream(outputZipFile, FileMode.Create))
    using (ZipArchive archive = new ZipArchive(zipToCreate, ZipArchiveMode.Create))
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
      archive.CreateEntryFromFile(filePath, relativePath);
    }
  }
}
