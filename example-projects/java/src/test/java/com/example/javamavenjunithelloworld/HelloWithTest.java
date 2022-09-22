package com.example.javamavenjunithelloworld;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

class HelloWithTest {
    
@Test
@Disabled("for demonstration purposes")
public void testFaild() {
    assertTrue(false);
}
@Test
public void testSucess() {
    assertTrue(true);
}
@Test
@Disabled("for demonstration purposes")
public void testSikp() {
    assertTrue(true);
}
}
