using System.Collections;
using UnityEngine.UI;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour {

	public float speed;
	public Text countText;
	public Text winText;
	// public Dropdown dropdown;

	private Rigidbody rb;
	private int count;
	private Renderer rn;
	private float elapsedTime;
	
	List<string> colors = new List<string>() { "Red", "Green"};

	void Start() {
		rb = GetComponent<Rigidbody> ();
		count = 0;
		SetCountText(); // count must hold some value for the ToString function to work
		winText.text = "";
		rn = GetComponent<Renderer> ();
	}

	// Changes the color of the 'player' from green to red and back according to the dropdown menu
	public void Dropdown_IndexChanged(int index) {
		rn.material.color = (index == 0) ? Color.red : Color.green;
	}

	void FixedUpdate() {
		float moveHorizontal = Input.GetAxis ("Horizontal");
		float moveVertical = Input.GetAxis ("Vertical");

		Vector3 movement = new Vector3 (moveHorizontal, 0.0f, moveVertical);

		rb.AddForce (movement * speed);
	}

	void OnTriggerEnter(Collider other) {
		if (other.gameObject.CompareTag("Pick Up")) {
			other.gameObject.SetActive(false);
			count++;
			SetCountText();
		}
	}

	// Both count and countText are global variables for the whole script, so we don't need to pass them as arguments
	void SetCountText() {
		countText.text = "Count: " + count.ToString();
		if (count >= 12) {
			winText.text = "You Win!";
		}
	}

	// Changes the color of the 'player' from green to red and back every X seconds
	void Update() {
	    elapsedTime += Time.deltaTime;

	    if (elapsedTime >= 3) {
	        elapsedTime -= 3;
			rn = GetComponent<Renderer> ();
			if (rn.material.color == Color.red) {
				rn.material.color = Color.green;
			} else {
				rn.material.color = Color.red;
			}
		}
	}

	// Changes the color of the 'player' from green to red and back according to the toggle
	public void toggleColor(bool val) {
		rn.material.color = (val == true) ? Color.red : Color.green;
	}

}