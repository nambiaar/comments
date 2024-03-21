import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { CommentObj } from "../../src/App";
import { CommentCard } from "../../src/components/CommentCard";
import { sub, format } from "date-fns";
import "@testing-library/jest-dom";

describe("commentCard", () => {
  afterEach(() => {
    // Clear the screen after each test
    cleanup();
  });

  it("should create a comment card given the inputs", () => {
    const testMessage: CommentObj = {
      id: 123,
      name: "Ranj",
      message: "Hello there!",
      created: "2023-10-02 15:44:57",
    };

    render(<CommentCard comment={testMessage} />);
    expect(screen.getByText(testMessage.name)).toBeInTheDocument();
    expect(screen.getByText(testMessage.message)).toBeInTheDocument();
  });

  it("should create a comment card with recent formatted date", () => {
    const recentTestDate = sub(new Date(), {
      days: 2,
    });

    const testMessage: CommentObj = {
      id: 123,
      name: "Ranj",
      message: "Hello there!",
      created: format(recentTestDate, "yyyy-MM-dd HH:mm:ss"),
    };

    const expectedDate = format(recentTestDate, "EEEE 'at' p");

    render(<CommentCard comment={testMessage} />);
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
    screen.debug();
  });

  it("should create a comment card with older formatted date", () => {
    const olderTestDate = sub(new Date(), {
      days: 7,
    });

    const testMessage: CommentObj = {
      id: 123,
      name: "Ranj",
      message: "Hello there!",
      created: format(olderTestDate, "yyyy-MM-dd HH:mm:ss"),
    };

    const expectedDate = format(olderTestDate, "MMMM do 'at' p");

    render(<CommentCard comment={testMessage} />);
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
    screen.debug();
  });
});
