from django import forms

from django.contrib.auth.models import User
from django.contrib.auth import authenticate as auth_authenticate


class UploadFileForm(forms.Form):
	title = forms.CharField(max_length=50)
	picture = forms.ImageField(widget=forms.FileInput(attrs={'class':'form-control', 'placeholder':'Upload Picture', 'style':'text-align: center;'}))

class Registration(forms.Form):

	username = forms.CharField(max_length = 100, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Username', 'style':'text-align: center;'}))
	password = forms.CharField(max_length = 100, widget=forms.PasswordInput(attrs={'class':'form-control', 'placeholder':'Password', 'style':'text-align: center;'}))
	reEnterPassword = forms.CharField(max_length = 100, widget=forms.PasswordInput(attrs={'class':'form-control', 'placeholder':'Re-enter Password', 'style':'text-align: center;'}))

	def clean(self):
		cleaned_data = super(Registration, self).clean()

		password = cleaned_data.get('password')
		reEnterPassword = cleaned_data.get('reEnterPassword')

		if password and reEnterPassword and password != reEnterPassword:
			raise forms.ValidationError("Passwords don't match")

		return cleaned_data


	def clean_username(self):
		username = self.cleaned_data.get('username')

		if User.objects.filter(username__exact=username):
			raise forms.ValidationError("Username is already taken")
		return username


class Login(forms.Form):
	username = forms.CharField(max_length = 100, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Username', 'style':'text-align: center;'}))
	password = forms.CharField(max_length = 100, widget=forms.PasswordInput(attrs={'class':'form-control', 'placeholder':'Password', 'style':'text-align: center;'}))

	def clean(self):
		cleaned_data = super(Login, self).clean()

		username = cleaned_data.get('username')
		password = cleaned_data.get('password')

		if User.objects.filter(username__exact=username):

			user = User.objects.get(username=username)
			if not user.is_active:
				raise forms.ValidationError("The account has not been activated. Please check email")

			logged_in_user = auth_authenticate(username=username, password=password)
			if logged_in_user == None:
				raise forms.ValidationError("Incorrect password")

		return cleaned_data


	def clean_username(self):
		username = self.cleaned_data.get('username')
		
		if not User.objects.filter(username__exact=username):
			raise forms.ValidationError("No such username")

		return username

