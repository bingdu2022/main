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

      messageLabel.Visible = false;

      //// Attach the Shown event handler
      //Shown += MainForm_Shown;

    }

    private async void ConvertButton_Click(object sender, EventArgs e)
    {
      string sqlCode = SqlCodeTextBox.Text;

      // Exclude comments before converting SQL keywords to uppercase
      sqlCode = ExcludeComments(sqlCode);

      // Convert SQL keywords to uppercase using a regular expression
      string convertedSqlCode = Regex.Replace(sqlCode, @"\b(SELECT|FROM|WHERE|AND|OR|INSERT|UPDATE|DELETE|CREATE|TABLE|INDEX|ALTER|DROP|JOIN|ON|COALESCE|ABS|AVG|COUNT|MAX|MIN|SUM|ROUND|CEIL|FLOOR|POWER|SQRT|EXP|LOG|LOG10|RAND|RANDN|MOD|CONCAT|LENGTH|SUBSTRING|LEFT|RIGHT|TRIM|LTRIM|RTRIM|LOWER|UPPER|INITCAP|REPLACE|TRANSLATE|TO_NUMBER|TO_CHAR|TO_DATE|NVL|CASE|DECODE|IFNULL|NULLIF|CAST|CONVERT|GETDATE|CURRENT_TIMESTAMP|CURRENT_DATE|CURRENT_TIME|DATEDIFF|DATEADD|YEAR|MONTH|DAY|HOUR|MINUTE|SECOND)\b", match => match.Value.ToUpper(), RegexOptions.IgnoreCase);

      // Update the textbox with the modified SQL code
      SqlCodeTextBox.Text = convertedSqlCode;

      // Copy the converted text to the clipboard
      Clipboard.SetText(convertedSqlCode);

      //// Optionally, you can show a message to indicate that the text has been copied
      //MessageBox.Show("Converted text has been copied to the clipboard.", "Conversion Complete", MessageBoxButtons.OK, MessageBoxIcon.Information);

      // Show the message label
      ShowMessageLabel("Converted text has been copied to the clipboard.");

      // hide the label after a certain delay
      //System.Threading.Tasks.Task.Delay(3000).ContinueWith(t => HideMessageLabel());

      // Set conversionDone flag to true
      bool conversionDone = true;

      // Optionally, you can set a delay before hiding the message label
      await Task.Delay(3000); // 3000 milliseconds (3 seconds)

      // If conversionDone is still true, hide the message label
      if (conversionDone)
      {
        // Use Invoke to perform UI updates on the UI thread
        Invoke(new Action(() => HideMessageLabel()));

        // Reset the conversionDone flag
        conversionDone = false;
      }
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

    private void ShowMessageLabel(string message)
    {
      messageLabel.Text = message;
      messageLabel.Visible = true;
    }

    private void HideMessageLabel()
    {
      messageLabel.Visible = false;
    }

  //private async void MainForm_Shown(object sender, EventArgs e)
  //{
  //  // Optionally, you can set a delay before hiding the message label
  //  await Task.Delay(3000); // 3000 milliseconds (3 seconds)

  //  // Hide the message label
  //  HideMessageLabel();
  //}

}

}
