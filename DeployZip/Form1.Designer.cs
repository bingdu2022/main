namespace DeployZip
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
      this.lable1 = new System.Windows.Forms.Label();
      this.txtZipPath = new System.Windows.Forms.TextBox();
      this.btnExtract = new System.Windows.Forms.Button();
      this.lstLog = new System.Windows.Forms.ListBox();
      this.SuspendLayout();
      // 
      // lable1
      // 
      this.lable1.AutoSize = true;
      this.lable1.Location = new System.Drawing.Point(13, 13);
      this.lable1.Name = "lable1";
      this.lable1.Size = new System.Drawing.Size(98, 13);
      this.lable1.TabIndex = 0;
      this.lable1.Text = "Drag a zip file here:";
      // 
      // txtZipPath
      // 
      this.txtZipPath.AllowDrop = true;
      this.txtZipPath.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
      this.txtZipPath.Location = new System.Drawing.Point(117, 12);
      this.txtZipPath.Multiline = true;
      this.txtZipPath.Name = "txtZipPath";
      this.txtZipPath.Size = new System.Drawing.Size(671, 54);
      this.txtZipPath.TabIndex = 1;
      // 
      // btnExtract
      // 
      this.btnExtract.Location = new System.Drawing.Point(16, 75);
      this.btnExtract.Name = "btnExtract";
      this.btnExtract.Size = new System.Drawing.Size(75, 23);
      this.btnExtract.TabIndex = 2;
      this.btnExtract.Text = "Extract";
      this.btnExtract.UseVisualStyleBackColor = true;
      // 
      // lstLog
      // 
      this.lstLog.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
      this.lstLog.FormattingEnabled = true;
      this.lstLog.Location = new System.Drawing.Point(16, 111);
      this.lstLog.Name = "lstLog";
      this.lstLog.Size = new System.Drawing.Size(771, 329);
      this.lstLog.TabIndex = 3;
      // 
      // Form1
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(800, 450);
      this.Controls.Add(this.lstLog);
      this.Controls.Add(this.btnExtract);
      this.Controls.Add(this.txtZipPath);
      this.Controls.Add(this.lable1);
      this.Name = "Form1";
      this.Text = "Form1";
      this.ResumeLayout(false);
      this.PerformLayout();

    }

    #endregion

    private System.Windows.Forms.Label lable1;
    private System.Windows.Forms.TextBox txtZipPath;
    private System.Windows.Forms.Button btnExtract;
    private System.Windows.Forms.ListBox lstLog;
  }
}

