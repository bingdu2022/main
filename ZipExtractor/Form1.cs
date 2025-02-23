using ICSharpCode.SharpZipLib.Zip;
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

namespace ZipExtractor
{
  public partial class Form1 : Form
  {
    public Form1()
    {
      InitializeComponent();

      // Explicitly enable Drag & Drop
      this.AllowDrop = true;
      txtZipPath.AllowDrop = true;  // Ensure textbox also allows dropping

      // Attach event handlers
      //this.DragEnter += Form1_DragEnter;
      //this.DragDrop += Form1_DragDrop;
      txtZipPath.DragEnter += Form1_DragEnter;
      txtZipPath.DragDrop += Form1_DragDrop;
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

      try
      {
        using (var zip = new ZipFile(File.OpenRead(zipFilePath)))
        {
          if (!zip.TestArchive(true))
          {
            lstLog.Items.Add("ZIP file is corrupted.");
            return;
          }

          foreach (ZipEntry entry in zip)
          {
            if (!entry.IsFile) continue;

            string entryPath = Path.Combine(outputDir, entry.Name);
            Directory.CreateDirectory(Path.GetDirectoryName(entryPath));

            using (var zipStream = zip.GetInputStream(entry))
            using (var fileStream = File.Create(entryPath))
            {
              zipStream.CopyTo(fileStream);
            }

            lstLog.Items.Add($"Extracted: {entry.Name}");
          }
        }

        lstLog.Items.Add("Extraction complete.");
      }
      catch (Exception ex)
      {
        lstLog.Items.Add("Error: " + ex.Message);
      }
    }

  }
}
