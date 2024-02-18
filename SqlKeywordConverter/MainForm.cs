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

      // Enable drag and drop for the TextBox. Below can be configured in Properties UI
      TxtSqlCode.AllowDrop = true;

      // Attach event handlers for drag and drop
      TxtSqlCode.DragEnter += SqlCodeTextBox_DragEnter;
      TxtSqlCode.DragDrop += SqlCodeTextBox_DragDrop;

      // below are configured in Properties UI. If not, can code them below
      //messageLabel.Visible = false;
      //messageLabel.BackColor = Color.Yellow;
      //messageLabel.Font = new System.Drawing.Font(messageLabel.Font, System.Drawing.FontStyle.Bold);

      //// Attach the Shown event handler
      //Shown += MainForm_Shown;

    }

    private void ConvertButton_Click(object sender, EventArgs e)
    {
      try
      {
        string sqlCode = TxtSqlCode.Text;

        // Exclude comments before converting SQL keywords to uppercase
        sqlCode = ExcludeComments(sqlCode);

        // Convert SQL keywords to uppercase using a regular expression
        string convertedSqlCode = Regex.Replace(sqlCode, @"\b(SELECT|FROM|WHERE|AND|OR|INSERT|UPDATE|DELETE|CREATE|TABLE|INDEX|ALTER|DROP|JOIN|ON|COALESCE|ABS|AVG|COUNT|MAX|MIN|SUM|ROUND|CEIL|FLOOR|POWER|SQRT|EXP|LOG|LOG10|RAND|RANDN|MOD|CONCAT|LENGTH|SUBSTRING|LEFT|RIGHT|TRIM|LTRIM|RTRIM|LOWER|UPPER|INITCAP|REPLACE|TRANSLATE|TO_NUMBER|TO_CHAR|TO_DATE|NVL|CASE|DECODE|IFNULL|NULLIF|CAST|CONVERT|GETDATE|CURRENT_TIMESTAMP|CURRENT_DATE|CURRENT_TIME|DATEDIFF|DATEADD|YEAR|MONTH|DAY|HOUR|MINUTE|SECOND)\b", match => match.Value.ToUpper(), RegexOptions.IgnoreCase);

        // Update the textbox with the modified SQL code
        TxtSqlCode.Text = convertedSqlCode;

        // Copy the converted text to the clipboard
        Clipboard.SetText(convertedSqlCode);

        //// Show a message to indicate that the text has been copied by using a popup
        //MessageBox.Show("Converted text has been copied to the clipboard.", "Conversion Complete", MessageBoxButtons.OK, MessageBoxIcon.Information);

        // Show the message label
        ShowAndHideMessageLabel("Copied to the clipboard!",3);

        // the below work too: hide the label after a certain delay
        //System.Threading.Tasks.Task.Delay(3000).ContinueWith(t => DelayedHideMessageLabel());
        //private void DelayedHideMessageLabel()
        //{
        //  // Use Invoke to perform UI updates on the UI thread
        //  if (this.InvokeRequired)
        //  {
        //    this.Invoke(new Action(DelayedHideMessageLabel));
        //  }
        //  else
        //  {
        //    // Hide the message label
        //    messageLabel.Visible = false;
        //  }
        //}


      }
      catch (Exception ex)
      {
        // Handle exceptions (e.g., display an error message or add error to textbox  )
        //MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        TxtSqlCode.Text = $"An error occurred: {ex.Message}.\r\n **************\r\n" + TxtSqlCode.Text;

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
        TxtSqlCode.Text = sqlCode;
      }
    }

    private async void ShowAndHideMessageLabel(string message, int howManySeconds)
    {
      // show message
      LblMessagel.Text = message;
      LblMessagel.Visible = true;

      // hide the message label after a certain time
      await Task.Delay(howManySeconds * 1000); 
      LblMessagel.Visible = false;
    }

    private void BtnClear_Click(object sender, EventArgs e)
    {
      TxtSqlCode.Text = string.Empty;
    }

    //private async void MainForm_Shown(object sender, EventArgs e)
    //{
    //  // Optionally, you can set a delay before hiding the message label
    //  await Task.Delay(3000); // 3000 milliseconds (3 seconds)

    //  // Hide the message label
    //  DelayedHideMessageLabel();
    //}

  }

}
