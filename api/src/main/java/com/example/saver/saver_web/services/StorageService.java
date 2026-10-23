package com.example.saver.saver_web.services;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class StorageService {
    private final Path root;

    public StorageService(@Value("${storage.path}") String path) throws IOException {
        this.root = Path.of(path).toAbsolutePath().normalize();
        Files.createDirectories(this.root);
    }

    public Path storeFile(
            String username,
            String projectName,
            String[] subDirs,
            String fileName,
            byte[] content
    ) throws IOException {
        Path combined = this.root.resolve(username).resolve(projectName);

        for (String dir : subDirs) {
            combined = combined.resolve(dir);
        }

        combined = combined.normalize();

        if (!combined.startsWith(this.root)) {
            throw new IllegalArgumentException("Invalid path");
        }

        Files.createDirectories(combined);

        Path file = combined.resolve(fileName).normalize();

        if (!file.startsWith(combined)) {
            throw new IllegalArgumentException("Invalid path");
        }

        Files.write(file, content);

        return file;
    }

    public Path getStoragePath(String username, String projectName, String type, String other) {
        Path p = root.resolve(username).resolve(projectName).resolve(".saver");
        if (type != null) p = p.resolve(type);
        if (other != null) p = p.resolve(other);
        p = p.normalize();

        if (!p.startsWith(root)) {
            throw new IllegalArgumentException("Invalid path");
        }
        return p;
    }

    public void storeFile(Path dir, String filename, byte[] bytes) throws IOException {
        Files.createDirectories(dir);
        Files.write(dir.resolve(filename), bytes);
    }
}
