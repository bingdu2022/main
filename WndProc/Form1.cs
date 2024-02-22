using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace test
{
  public partial class Form1 : Form
  {

    protected override void WndProc(ref Message m)
    {
      const int WM_SYSCOMMAND = 0x0112;
      const int SC_MAXIMIZE = 0xF030;
      const int SC_MINIMIZE = 0xF020;
      const int SC_RESTORE = 0xF120;
      const int WM_NCLBUTTONDBLCLK = 0x00A3;  // non-client area: double right-click mouse button
      const int WM_LBUTTONDBLCLK = 0x0203;
      const int WM_CLOSE = 0X0010;

      // Call beofre - don't use when "call after" is used
      // dependig on the needs may be called before, after or even never (see below)
      // base.WndProc(ref m);

      if (m.Msg == WM_SYSCOMMAND)
      {
        /// <see cref="https://learn.microsoft.com/en-us/windows/win32/menurc/wm-syscommand"/>
        /// Quote:
        /// In WM_SYSCOMMAND messages, the four low - order bits of the wParam parameter 
        /// are used internally by the system.To obtain the correct result when testing 
        /// the value of wParam, an application must combine the value 0xFFF0 with the 
        /// wParam value by using the bitwise AND operator.
        int wParam = (m.WParam.ToInt32() & 0xFFF0);
        int mLParam = (m.LParam.ToInt32() * 0xFFF0);

        Debug.WriteLine($"Received param: {Convert.ToString(wParam, 16)} ");
        Debug.WriteLine($"Received param: m.LParam = {Convert.ToString(m.LParam)} ");
        Debug.WriteLine($"Received m.LParam = {Convert.ToString(mLParam, 16)} ");

        if (wParam == SC_MAXIMIZE)
        {

        }
        else if (wParam == SC_MINIMIZE)
        {

          this.WindowState =  FormWindowState.Maximized;  // FormWindowState.Minimized;
            return;
  
        }else if (wParam == SC_RESTORE)
        {

        } else if(m.Msg == WM_CLOSE)
        {
          return;
        }
      }

      // Call after - don't use when "call before" is used
      base.WndProc(ref m);
    }

    public Form1()
    {
      InitializeComponent();
    }
  }
}
