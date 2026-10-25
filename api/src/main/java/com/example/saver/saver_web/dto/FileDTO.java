package com.example.saver.saver_web.dto;

public record FileDTO(
    String hash,
    byte[] content
) {}

