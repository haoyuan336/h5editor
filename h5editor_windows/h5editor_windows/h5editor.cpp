#include <Windows.h>
//先声明以下消息处理函数
LRESULT CALLBACK MyWindowProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam);
int CALLBACK WinMain(HINSTANCE hInstance,HINSTANCE hPrvInstance,LPSTR ipCommondLine,int cmdShow) {
    WCHAR* cln = L"MyApp";
    WNDCLASS wc = {};
    wc.hInstance = hInstance;
    wc.lpszClassName = cln;
    wc.lpfnWndProc = MyWindowProc;
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    wc.style = CS_HREDRAW | CS_VREDRAW;
    RegisterClass(&wc);
    HWND hMainwind = CreateWindow(
        cln,
        L"绘制窗口",
        WS_OVERLAPPEDWINDOW,
        20, 12,
        450, 280,
        NULL,
        NULL,
        hInstance,
        NULL);
    if (hMainwind == NULL)
        return 0;
    ShowWindow(hMainwind, SW_NORMAL);
    MSG msg;
    while (GetMessage(&msg,NULL,0,0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    return 0;
}
LRESULT CALLBACK MyWindowProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {
    switch (msg)
    {
    case WM_PAINT: 
    {
        PAINTSTRUCT ps;
        BeginPaint(hwnd, &ps);
        SetTextColor(ps.hdc, RGB(10, 0, 255));
        DrawText(ps.hdc, L"朋友,你好.", wcslen(L"朋友,你好."), &(ps.rcPaint), DT_CENTER);

        int arr1[2] = { 45,0 };
        int arr2[3] = { 30,40,0 };
        int arr3[2] = { 32,0 };
        POLYTEXT polys[] = { { 2,2,3,L"大家",ETO_CLIPPED,ps.rcPaint,&arr1[0] },
        { 2,25,3,L"新年好",ETO_CLIPPED,ps.rcPaint,&arr2[0] },
        { 30,60,3, L"快乐",ETO_CLIPPED,ps.rcPaint,&arr3[0] } };
        PolyTextOut(ps.hdc, &polys[0], 3);
        EndPaint(hwnd, &ps);
    }
	         return 0;
        break;
    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;
    default:
        break;
    }
    return DefWindowProc(hwnd, msg, wParam, lParam);

}