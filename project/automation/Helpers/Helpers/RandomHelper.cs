using System;

namespace Helpers.Helpers;

public static class RandomHelper
{

    public static string RandomAlphanumericString(int length)
    {
        Random random = new Random();
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }

    public static string RandomAsciiString(int length)
    {
        var random = new Random();
        return new string(Enumerable.Range(0, length)
            .Select(i => Convert.ToChar(random.Next(32, 126))).ToArray());
    }
}