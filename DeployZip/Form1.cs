using ICSharpCode.SharpZipLib.Zip;
using log4net;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DeployZip
{
  public partial class Form1 : Form
  {
    public Form1()
    {
      InitializeComponent();
      //this.DragDrop += Form1_DragDrop;
      txtZipPath.AllowDrop = true;
      txtZipPath.DragEnter += Form1_DragEnter;
      txtZipPath.DragDrop += Form1_DragDrop;

      btnExtract.Click += BtnExtract_Click;
    }

    private void Form1_DragEnter(object sender, DragEventArgs e)
    {
      if (e.Data.GetDataPresent(DataFormats.FileDrop))
      {
        e.Effect = DragDropEffects.Copy;
      }
    }

    private void Form1_DragDrop(object sender, DragEventArgs e)
    {
      string[] files = (string[])e.Data.GetData(DataFormats.FileDrop);
      if (files.Length > 0 && files[0].EndsWith(".zip"))
      {
        txtZipPath.Text = files[0];
        lstLog.Items.Clear();
        lstLog.Items.Add($"ZIP File Selected: {files[0]}");
      }
      else
      {
        lstLog.Items.Add("Not a valid ZIP file!");
      }
    }

    private void BtnExtract_Click(object sender, EventArgs e)
    {
      if (string.IsNullOrWhiteSpace(txtZipPath.Text) || !File.Exists(txtZipPath.Text))
      {
        lstLog.Items.Add("No ZIP file selected!");
        return;
      }

      string zipFilePath = txtZipPath.Text;
      string outputDir = Path.Combine(Path.GetDirectoryName(zipFilePath), "Extracted");
      string fileName = Path.GetFileName(zipFilePath);
      FileInfo fileInfo = new FileInfo(zipFilePath);
      FileHandle file = new FileHandle(fileInfo);

      DeployZip(file);

      //try
      //{

      //  var zip = new ZipFile(file.Stream);

      //  if (!zip.TestArchive(true)) return null;

      //  // eventually we want to find a manifest file and process it through EarthSoft.Common.Modules

      //  foreach (ZipEntry zippedFile in zip)
      //  {
      //    if (zippedFile.IsDirectory)
      //    {
      //      // eventually we may care
      //    }
      //    if (zippedFile.IsFile)
      //    {
      //      // since the zipentry object name contains the direectory structure, we have what we need.

      //      // dir will be the root directory we are running from
      //      string dir = AppDomain.CurrentDomain.BaseDirectory;
      //      if (!(dir.EndsWith("\\"))) dir += "\\";

      //      // the zipped file name includes the directory structure
      //      string filename = dir + zippedFile.Name;

      //      // here we extract the directory path so we can create the directory if it doesn't already exist
      //      string fileDir = Path.GetDirectoryName(filename);
      //      if (!(Directory.Exists(fileDir)))
      //      {
      //        Directory.CreateDirectory(fileDir);
      //      }

      //      // in this section we stream out the file byte by byte because
      //      // we don't actually care what type of file it is
      //      if (File.Exists(filename)) File.Delete(filename);
      //      var inputStream = zip.GetInputStream(zippedFile);
      //      var bw = new BinaryWriter(File.OpenWrite(filename));

      //      int i = 0;
      //      const int LEN = 1024;
      //      var buffer = new byte[LEN];

      //      // may want to consider changing this to a using loop since BinaryWriter implements IDisposable
      //      do
      //      {
      //        i = inputStream.Read(buffer, 0, LEN);
      //        if (i == 0) break;
      //        bw.Write(buffer, 0, i);
      //      } while (true);
      //      bw.Close();

      //      // report success on the unzipped files
      //      var file_info = new FileInfo(filename);
      //      using (FileHandle handle = new FileHandle(file_info))
      //      {
      //        _log.InfoFormat("Successfully unzipped file '{0}' from '{1}'.", handle.Info.Name, file.Info.Name);
      //      }
      //    }
      //  }

      //  // report that we finished processing the zip file and delete it
      //  zip.Close();

      //  _log.InfoFormat("Successfully unzipped file '{0}'.", file.Info.Name);
      //}
      //catch (Exception ex)
      //{
      //  _log.Error(ex.Message, ex);
      //}

    }

    private void DeployZip(FileHandle file)
    {
      try
      {

        var zip = new ZipFile(file.Stream);

        if (!zip.TestArchive(true))
        {
          lstLog.Items.Add("Opps, it's not a zip file!");
          return;
        }
        // eventually we want to find a manifest file and process it through EarthSoft.Common.Modules

        foreach (ZipEntry zippedFile in zip)
        {
          if (zippedFile.IsDirectory)
          {
            // eventually we may care
          }
          if (zippedFile.IsFile)
          {
            // since the zipentry object name contains the direectory structure, we have what we need.

            // dir will be the root directory we are running from
            string dir = AppDomain.CurrentDomain.BaseDirectory;
            if (!(dir.EndsWith("\\"))) dir += "\\";

            // the zipped file name includes the directory structure
            string filename = dir + zippedFile.Name;

            // here we extract the directory path so we can create the directory if it doesn't already exist
            string fileDir = Path.GetDirectoryName(filename);
            if (!(Directory.Exists(fileDir)))
            {
              Directory.CreateDirectory(fileDir);
            }

            // in this section we stream out the file byte by byte because
            // we don't actually care what type of file it is
            if (File.Exists(filename)) File.Delete(filename);
            var inputStream = zip.GetInputStream(zippedFile);
            var bw = new BinaryWriter(File.OpenWrite(filename));

            int i = 0;
            const int LEN = 1024;
            var buffer = new byte[LEN];

            // may want to consider changing this to a using loop since BinaryWriter implements IDisposable
            do
            {
              i = inputStream.Read(buffer, 0, LEN);
              if (i == 0) break;
              bw.Write(buffer, 0, i);
            } while (true);
            bw.Close();

            // report success on the unzipped files
            var file_info = new FileInfo(filename);
            using (FileHandle handle = new FileHandle(file_info))
            {
              lstLog.Items.Add($"Successfully unzipped file '{ handle.Info.Name}' from '{file.Info.Name}'.");
            }
          }
        }

        // report that we finished processing the zip file and delete it
        zip.Close();

        lstLog.Items.Add($"Successfully unzipped file '{file.Info.Name}'.");
      }
      catch (Exception ex)
      {
        lstLog.Items.Add(ex.Message + " - Stack: " + ex.StackTrace);
      }

    }


    /// <summary>
    /// represents a FileHandle used for module deployment
    /// </summary>
    public class FileHandle : IDisposable
    {

      private static log4net.ILog Log = log4net.LogManager.GetLogger(typeof(FileHandle));
      /// <summary>
      /// the FileInfo
      /// </summary>
      public FileInfo Info = null;
      /// <summary>
      /// the FileStream
      /// </summary>
      public FileStream Stream = null;

      /// <summary>
      /// creates a new instance of FileHandle
      /// </summary>
      /// <param name="file"></param>
      public FileHandle(FileInfo file)
      {
        try
        {

          this.Info = file;

          // to avoid processing files multiple times, open the file exclusively
          this.Stream = file.Open(FileMode.Open, FileAccess.Read, FileShare.None);
        }
        catch (Exception ex)
        {
          Log.Debug(ex.Message, ex);
        }
      }
      /// <summary>
      /// closes the file handle
      /// </summary>
      /// <param name="delete">indicates whether the file should be deleted after closing the handle</param>
      public void Close(bool delete)
      {
        try
        {
          lock (this)
          {
            this.Stream.Close();
            if (delete && !this.Info.IsReadOnly) this.Info.Delete();
            this.Stream = null;
          }
        }
        catch (Exception ex)
        {
          Log.Error(ex.Message, ex);
        }
      }
      /// <summary>
      /// closes the file handle without deleting the file
      /// </summary>
      public void Dispose()
      {
        this.Close(false);
      }
      /// <summary>
      /// gets the file content in string format
      /// </summary>
      /// <returns>the file content as a string</returns>
      public string GetContent()
      {
        try
        {
          var reader = new StreamReader(this.Stream);
          var content = reader.ReadToEnd();
          reader = null;
          return content;
        }
        catch (Exception ex)
        {
          Log.Error(ex.Message, ex);
          return null;
        }
      }
    }

  }
}
