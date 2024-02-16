using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.IO;
using System.Text.RegularExpressions;

namespace SqlKeywordConverter
{
  public partial class MainForm : Form
  {
    public MainForm()
    {
      InitializeComponent();

      // Enable drag and drop for the TextBox
      SqlCodeTextBox.AllowDrop = true;

      // Attach event handlers for drag and drop
      SqlCodeTextBox.DragEnter += SqlCodeTextBox_DragEnter;
      SqlCodeTextBox.DragDrop += SqlCodeTextBox_DragDrop;
    }

    private void ConvertButton_Click(object sender, EventArgs e)
    {
      string sqlCode = SqlCodeTextBox.Text;

      // Exclude comments before converting SQL keywords to uppercase
      sqlCode = ExcludeComments(sqlCode);

      // Convert SQL keywords to uppercase using a regular expression
      string convertedSqlCode = Regex.Replace(sqlCode, @"\b(SELECT|FROM|WHERE|AND|OR|INSERT|UPDATE|DELETE|CREATE|TABLE|INDEX|ALTER|DROP|JOIN)\b", match => match.Value.ToUpper(), RegexOptions.IgnoreCase);

      // Update the textbox with the modified SQL code
      SqlCodeTextBox.Text = convertedSqlCode;

      // Copy the converted text to the clipboard
      Clipboard.SetText(convertedSqlCode);

      // Optionally, you can show a message to indicate that the text has been copied
      MessageBox.Show("Converted text has been copied to the clipboard.", "Conversion Complete", MessageBoxButtons.OK, MessageBoxIcon.Information);

    }

    private string ExcludeComments(string code)
    {
      // Exclude single-line comments (--)
      int singleLineCommentIndex = code.IndexOf("--");
      if (singleLineCommentIndex != -1)
      {
        code = code.Substring(0, singleLineCommentIndex);
      }

      // Exclude multiline comments (/* ... */)
      int multiLineCommentStartIndex = code.IndexOf("/*");
      int multiLineCommentEndIndex = code.IndexOf("*/");
      if (multiLineCommentStartIndex != -1 && multiLineCommentEndIndex != -1 && multiLineCommentEndIndex > multiLineCommentStartIndex)
      {
        code = code.Remove(multiLineCommentStartIndex, multiLineCommentEndIndex - multiLineCommentStartIndex + 2);
      }

      return code;
    }

    private void SqlCodeTextBox_DragEnter(object sender, DragEventArgs e)
    {
      // Check if the data being dragged is a file
      if (e.Data.GetDataPresent(DataFormats.FileDrop))
      {
        // Check if the effect should be set to Copy
        if ((e.AllowedEffect & DragDropEffects.Copy) != 0)
        {
          e.Effect = DragDropEffects.Copy;
        }
        else
        {
          // If Copy is not allowed, set the effect to None
          e.Effect = DragDropEffects.None;
        }
      }
      else
      {
        e.Effect = DragDropEffects.None;
      }
    }


    private void SqlCodeTextBox_DragDrop(object sender, DragEventArgs e)
    {
      // Get the file(s) dropped onto the TextBox
      string[] files = (string[])e.Data.GetData(DataFormats.FileDrop);

      if (files.Length > 0)
      {
        // Read the content of the first file and set it as the TextBox text
        string sqlCode = File.ReadAllText(files[0]);

        // Update the TextBox
        SqlCodeTextBox.Text = sqlCode;
      }
    }
     
  }

}
