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
using System.Xml.Linq;

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
        string sqlCode = TxtSqlCode.Text;  // it holds multiple lines

        // Extract comments before converting SQL keywords to uppercase
        var comments = ExtractAndReplaceComments(ref sqlCode);

        // Convert SQL keywords to uppercase using a regular expression: find each of them with ignoring case (e.g. Select, selEct) and make it uppercase
        string convertedSqlCode = Regex.Replace(sqlCode, @"\b(SELECT|FROM|WHERE|AND|OR|INSERT|UPDATE|DELETE|CREATE|TABLE|INDEX|ALTER|DROP|JOIN|ON|COALESCE|ABS|AVG|COUNT|MAX|MIN|SUM|ROUND|CEIL|FLOOR|POWER|SQRT|EXP|LOG|LOG10|RAND|RANDN|MOD|CONCAT|LENGTH|SUBSTRING|LEFT|RIGHT|TRIM|LTRIM|RTRIM|LOWER|UPPER|INITCAP|REPLACE|TRANSLATE|TO_NUMBER|TO_CHAR|TO_DATE|NVL|CASE|DECODE|IFNULL|NULLIF|CAST|CONVERT|GETDATE|CURRENT_TIMESTAMP|CURRENT_DATE|CURRENT_TIME|DATEDIFF|DATEADD|YEAR|MONTH|DAY|HOUR|MINUTE|SECOND)\b", match => match.Value.ToUpper(), RegexOptions.IgnoreCase);

        convertedSqlCode = ReplaceCommentsBack(convertedSqlCode, comments);

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

    private List<string> ExtractAndReplaceComments(ref string sqlCode)
    {
      var comments = new System.Collections.Generic.List<string>();

      var commentRegex = new Regex(@"--.*?$|/\*(.*?\*/|.*$)", RegexOptions.Singleline | RegexOptions.Multiline);
      //  --.*?$:
      //    --: Matches the double hyphen indicating the start of a single-line comment.
      //    .*?: Matches any character(except for a newline) zero or more times, but as few times as possible (non - greedy).
      //    $: Asserts position at the end of a line.
      //  This part matches single-line comments from --to the end of the line.

      //  |: (the first |)
      //    Acts as a logical OR, allowing the expression to match either -- or /* ... */

      //  /\*(.*?\*/|.*$):
      //    /\*: Matches the opening of a multi-line comment.
      //    (.*?\*/|.*$): This is a group that matches either:
      //      .*?\*/: Any character(including newline) zero or more times, but as few times as possible, followed by the closing of a multi - line comment */.
      //      .*$: Any character(including newline) zero or more times until the end of the string.
      //  This part matches multi-line comments enclosed between /* and */, as well as any content until the end of the string if the closing */ is not found.

      //  RegexOptions.Singleline | RegexOptions.Multiline:
      //    RegexOptions.Singleline: Treats the entire input string as a single line, allowing the.to match newline characters.
      //    RegexOptions.Multiline: Allows the ^and $ anchors to match the start and end of each line within the input string rather than the start and end of the entire string.

      //  Together, the regular expression captures both single-line and multi-line comments in SQL code, including cases where multi - line comments span multiple lines.

      sqlCode = commentRegex.Replace(sqlCode, match =>  // it has 2 actions: 1. find a match and add it to comments; 2. replace each match with __COMMENT_0, 1 ...
      {
        comments.Add(match.Value);
        return $"__COMMENT_{comments.Count - 1}__";   // replace the first match with __COMMENT_0, the second with __COMMENT_1 ... until the last match
      });

      return comments;
    }

    private string ReplaceCommentsBack(string sqlCode, List<string> comments)
    {
      for (int i = 0; i < comments.Count; i++)
      {
        sqlCode = sqlCode.Replace($"__COMMENT_{i}__", comments[i]);
      }
      return sqlCode;
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
