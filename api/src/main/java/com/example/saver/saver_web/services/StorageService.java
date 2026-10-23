package com.example.saver.saver_web.services;


import com.example.saver.saver_web.dto.FileDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class StorageService {
    private final Path root;

    public StorageService(@Value("${storage.path}") String path) throws IOException {
        this.root = Path.of(path).toAbsolutePath().normalize();
        Files.createDirectories(this.root);
    }

    public void CreateProjectFolder(
            String username,
            String projectName
    ) throws IOException {
        Path p = this.root.resolve(username).resolve(projectName);

        p = p.normalize();
        Files.createDirectories(p);
    }

    public FileDTO RetrieveFile(
            String username,
            String projectName,
            String[] subDirs,
            String fileName
    ) throws IOException {
        Path combined = this.root.resolve(username).resolve(projectName).resolve("./saver");

        for (String dir : subDirs) {
            combined = combined.resolve(dir);
        }
        combined = combined.normalize();

        if (!combined.startsWith(this.root)) {
            throw new IllegalArgumentException("Invalid path");
        }

        // hash: first two chars = folder, rest = filename
        Path file = combined.resolve(fileName.substring(0, 2)).resolve(fileName.substring(2));
        file = file.normalize();

        if (!file.startsWith(combined)) {
            throw new IllegalArgumentException("Invalid file");
        }

        return new FileDTO(
                fileName,
                Files.readAllBytes(file)
        );
    }

    public Path storeFile(
            String username,
            String projectName,
            String[] subDirs,
            String fileName,
            byte[] content
    ) throws IOException {
        Path combined = this.root.resolve(username).resolve(projectName).resolve("./saver");

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
}
