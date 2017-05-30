#include <Windows.h>
#define IDM_OPT1 301
#define IDM_OPT2 302
HMENU hRoot;
void CreateMyMenu();
LRESULT CALLBACK MyWinProce(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam);
int CALLBACK WinMain(HINSTANCE hInstance,HINSTANCE hPrevInstance,LPSTR cmdLine,int show) {
    CreateMyMenu();
     WCHAR*cn = L"MyApp";
    WNDCLASS wc = {};
    wc.hbrBackground = (HBRUSH)COLOR_WINDOW;
    wc.lpszClassName = cn;
    wc.hInstance = hInstance;
    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpfnWndProc = (WNDPROC)MyWinProce;
    RegisterClass(&wc);
    HWND hm = CreateWindow(
        cn,
        L"我的应用程序",
        WS_OVERLAPPEDWINDOW,
        20,
        15,
        420,
        360,
        NULL,
        hRoot,
        hInstance,
        NULL
    );
    if (hm == NULL)
        return 0;
    ShowWindow(hm,show); 
    MSG msg;
  while (GetMessage(&msg,NULL,0,0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    return 0;
}
LRESULT CALLBACK MyWinProce(HWND hwnd, UINT msg, WPARAM wParam,LPARAM lParam) {
    switch (msg)
    {
    case WM_COMMAND:
    {
        switch (LOWORD(wParam))
        {
        default:
	  break;
        }
    }
        break;
    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;
    default:
        return DefWindowProc(hwnd, msg, wParam, lParam);

        break;
    }
}
void CreateMyMenu() {
    hRoot = CreateMenu();
    if (!hRoot)
        return;
    HMENU pop1 = CreatePopupMenu();
    AppendMenu(hRoot,
        MF_POPUP,
        (UINT_PTR)pop1,
        L"操作");
    AppendMenu(pop1,
        MF_STRING,
        IDM_OPT1,
        L"飞机");
    MENUITEMINFO mif;
    mif.cbSize = sizeof(MENUITEMINFO);
    mif.cch = 100;
    mif.dwItemData = NULL;
    mif.dwTypeData = L"机关枪";
    mif.fMask = MIIM_ID | MIIM_STRING | MIIM_STATE;
    mif.fState = MFS_ENABLED;
    mif.fType = MIIM_STRING;
    mif.wID = IDM_OPT2;
    InsertMenuItem(pop1, IDM_OPT2, FALSE, &mif);

}