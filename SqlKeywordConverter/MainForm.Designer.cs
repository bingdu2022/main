namespace SqlKeywordConverter
{
  partial class MainForm
  {
    /// <summary>
    /// Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    /// Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
      this.SqlCodeTextBox = new System.Windows.Forms.TextBox();
      this.ConvertButton = new System.Windows.Forms.Button();
      this.messageLabel = new System.Windows.Forms.Label();
      this.SuspendLayout();
      // 
      // SqlCodeTextBox
      // 
      this.SqlCodeTextBox.AllowDrop = true;
      this.SqlCodeTextBox.Location = new System.Drawing.Point(2, 38);
      this.SqlCodeTextBox.Multiline = true;
      this.SqlCodeTextBox.Name = "SqlCodeTextBox";
      this.SqlCodeTextBox.Size = new System.Drawing.Size(797, 400);
      this.SqlCodeTextBox.TabIndex = 0;
      // 
      // ConvertButton
      // 
      this.ConvertButton.Location = new System.Drawing.Point(2, 3);
      this.ConvertButton.Name = "ConvertButton";
      this.ConvertButton.Size = new System.Drawing.Size(75, 29);
      this.ConvertButton.TabIndex = 1;
      this.ConvertButton.Text = "Convert";
      this.ConvertButton.UseVisualStyleBackColor = true;
      this.ConvertButton.Click += new System.EventHandler(this.ConvertButton_Click);
      // 
      // messageLabel
      // 
      this.messageLabel.AutoSize = true;
      this.messageLabel.Location = new System.Drawing.Point(83, 11);
      this.messageLabel.Name = "messageLabel";
      this.messageLabel.Size = new System.Drawing.Size(35, 13);
      this.messageLabel.TabIndex = 2;
      this.messageLabel.Text = "label1";
      // 
      // MainForm
      // 
      this.AllowDrop = true;
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.AutoSize = true;
      this.ClientSize = new System.Drawing.Size(800, 450);
      this.Controls.Add(this.messageLabel);
      this.Controls.Add(this.ConvertButton);
      this.Controls.Add(this.SqlCodeTextBox);
      this.Name = "MainForm";
      this.Text = "Form1";
      this.ResumeLayout(false);
      this.PerformLayout();

    }

    #endregion

    private System.Windows.Forms.TextBox SqlCodeTextBox;
    private System.Windows.Forms.Button ConvertButton;
    private System.Windows.Forms.Label messageLabel;
  }
}

