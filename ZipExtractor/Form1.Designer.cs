﻿namespace ZipExtractor
{
  partial class Form1
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
      this.label1 = new System.Windows.Forms.Label();
      this.txtZipPath = new System.Windows.Forms.TextBox();
      this.btnExtract = new System.Windows.Forms.Button();
      this.lstLog = new System.Windows.Forms.ListBox();
      this.SuspendLayout();
      // 
      // label1
      // 
      this.label1.AutoSize = true;
      this.label1.Location = new System.Drawing.Point(12, 13);
      this.label1.Name = "label1";
      this.label1.Size = new System.Drawing.Size(99, 13);
      this.label1.TabIndex = 0;
      this.label1.Text = "Drag a ZIP file here";
      // 
      // txtZipPath
      // 
      this.txtZipPath.AllowDrop = true;
      this.txtZipPath.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
      this.txtZipPath.Location = new System.Drawing.Point(117, 10);
      this.txtZipPath.Multiline = true;
      this.txtZipPath.Name = "txtZipPath";
      this.txtZipPath.Size = new System.Drawing.Size(671, 46);
      this.txtZipPath.TabIndex = 1;
      // 
      // btnExtract
      // 
      this.btnExtract.Location = new System.Drawing.Point(12, 57);
      this.btnExtract.Name = "btnExtract";
      this.btnExtract.Size = new System.Drawing.Size(75, 23);
      this.btnExtract.TabIndex = 2;
      this.btnExtract.Text = "Extract";
      this.btnExtract.UseVisualStyleBackColor = true;
      this.btnExtract.Click += new System.EventHandler(this.BtnExtract_Click);
      // 
      // lstLog
      // 
      this.lstLog.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
      this.lstLog.FormattingEnabled = true;
      this.lstLog.Location = new System.Drawing.Point(12, 86);
      this.lstLog.Name = "lstLog";
      this.lstLog.Size = new System.Drawing.Size(776, 342);
      this.lstLog.TabIndex = 3;
      // 
      // Form1
      // 
      this.AllowDrop = true;
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(800, 450);
      this.Controls.Add(this.lstLog);
      this.Controls.Add(this.btnExtract);
      this.Controls.Add(this.txtZipPath);
      this.Controls.Add(this.label1);
      this.Name = "Form1";
      this.Text = "Form1";
      this.ResumeLayout(false);
      this.PerformLayout();

    }

    #endregion

    private System.Windows.Forms.Label label1;
    private System.Windows.Forms.TextBox txtZipPath;
    private System.Windows.Forms.Button btnExtract;
    private System.Windows.Forms.ListBox lstLog;
  }
}

